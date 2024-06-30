'use server'

import { Page } from 'puppeteer'

import { profileDTO, userAuthDTO } from '@/lib/dto'
import {
	LOGIN_ENDPOINT,
	LOGIN_URL,
	LoginResponse,
	PROFILE_ENDPOINT,
	PROFILE_URL,
	ProfileResponse,
	USER_DATA_LOCAL_STORAGE_KEY,
	VERIFY_NATIONALITY_ID_URL,
} from '@/lib/my-pertamina'
import { createBrowser, setupPage } from '@/lib/puppeteer'
import {
	ErrorResponse,
	UserAuth,
	UserCredential,
	UserProfile,
} from '@/lib/types'
import { getMyPertaminaErrorResponse, isErrorResponse } from '@/lib/utils'

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

export async function checkCookieExpiration(
	page: Page,
	url: string,
): Promise<null | ErrorResponse> {
	const isRedirected = page.url() !== url

	return isRedirected ? getMyPertaminaErrorResponse('INVALID_COOKIES') : null
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
	await page.goto(VERIFY_NATIONALITY_ID_URL, { waitUntil: 'networkidle0' })

	const cookieError = await checkCookieExpiration(
		page,
		VERIFY_NATIONALITY_ID_URL,
	)
	if (isErrorResponse(cookieError)) {
		await browser.close()

		return cookieError
	}

	await page.locator('div[data-testid="btnLogout"]').click()
	await page.locator('button[data-testid="btnLogout"][type="button"]').click()

	await browser.close()

	return null
}

export async function getProfile(
	auth: UserAuth,
): Promise<UserProfile | ErrorResponse> {
	const browser = await createBrowser()
	const page = await setupPage(browser)

	await setupAuth(page, auth)
	await page.goto(PROFILE_URL)

	const cookieError = await checkCookieExpiration(page, PROFILE_URL)
	if (cookieError) {
		await browser.close()

		return cookieError
	}

	const profileRes = await page.waitForResponse(
		(response) =>
			response.url() === PROFILE_ENDPOINT &&
			response.request().method().toUpperCase() !== 'OPTIONS',
	)

	if (!profileRes.ok()) {
		await browser.close()

		return getMyPertaminaErrorResponse('INTERNAL_SERVER_ERROR')
	}

	const profileResBody: ProfileResponse = await profileRes.json()

	await browser.close()

	return profileDTO(profileResBody)
}
