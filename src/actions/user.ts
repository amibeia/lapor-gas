'use server'

import { Page } from 'puppeteer'

import { userAuthDTO } from '@/lib/dto'
import {
	LOGIN_ENDPOINT,
	LOGIN_URL,
	LoginResponse,
	PROFILE_ENDPOINT,
	USER_DATA_LOCAL_STORAGE_KEY,
	VERIFY_NATIONALITY_ID_URL,
} from '@/lib/my-pertamina'
import { createBrowser, setupPage } from '@/lib/puppeteer'
import { ErrorResponse, UserAuth, UserCredential } from '@/lib/types'
import { getMyPertaminaErrorResponse } from '@/lib/utils'

export async function setupAuth(page: Page, auth: UserAuth) {
	await page.goto(LOGIN_URL, { waitUntil: 'networkidle2' })
	await page.setCookie(...auth.cookies)
	await page.evaluate(
		(key, auth) => {
			window.localStorage.setItem(
				key,
				JSON.stringify({ accessToken: auth.accessToken, ...auth.settings }),
			)
		},
		USER_DATA_LOCAL_STORAGE_KEY,
		auth,
	)
}

export async function login(
	phoneNumber: UserCredential['phoneNumber'],
	pin: UserCredential['pin'],
): Promise<UserAuth | ErrorResponse> {
	const browser = await createBrowser()
	const page = await setupPage(browser)

	await page.goto(LOGIN_URL, { waitUntil: 'networkidle2' })

	await page.locator('#mantine-r0').fill(phoneNumber)
	await page.locator('#mantine-r1').fill(pin)
	await page.locator('[type="submit"]').click()

	const loginRes = await page.waitForResponse(
		(response) =>
			response.url() === LOGIN_ENDPOINT &&
			response.request().method().toUpperCase() !== 'OPTIONS',
	)

	if (!loginRes.ok()) {
		await browser.close()

		return getMyPertaminaErrorResponse('INVALID_CREDENTIALS')
	}

	const loginResBody: LoginResponse = await loginRes.json()
	const cookies = await page.cookies()

	await browser.close()

	return userAuthDTO(loginResBody, cookies)
}

export async function logout(auth: UserAuth): Promise<null | ErrorResponse> {
	const browser = await createBrowser()
	const page = await setupPage(browser)

	await setupAuth(page, auth)
	await page.goto(VERIFY_NATIONALITY_ID_URL)

	const profileRes = await page.waitForResponse(
		(response) =>
			response.url() === PROFILE_ENDPOINT &&
			response.request().method().toUpperCase() !== 'OPTIONS',
	)

	if (!profileRes.ok() && profileRes.status() === 401) {
		await browser.close()

		return getMyPertaminaErrorResponse('INVALID_COOKIES')
	}

	await page.locator('div[data-testid="btnLogout"]').click()
	await page.locator('button[data-testid="btnLogout"][type="button"]').click()

	await browser.close()

	return null
}
