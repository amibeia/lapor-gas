'use server'

import { HTTPResponse } from 'puppeteer'

import { setupAuth } from '@/actions/user'
import { customerDTO } from '@/lib/dto'
import {
	MY_PERTAMINA_ERROR_RESPONSE,
	PROFILE_ENDPOINT,
	VERIFY_NATIONALITY_ID_ENDPOINT,
	VERIFY_NATIONALITY_ID_URL,
	VerifyNationalityIdResponse,
} from '@/lib/my-pertamina'
import { createBrowser, setupPage } from '@/lib/puppeteer'
import { Customer, ErrorResponse, UserAuth } from '@/lib/types'
import { getMyPertaminaErrorResponse } from '@/lib/utils'

function getVerifyNationalityIdErrorResponse(
	response: HTTPResponse,
	nationalityId: Customer['nationalityId'],
) {
	const errorResponses = Object.entries(MY_PERTAMINA_ERROR_RESPONSE).map(
		([_, value]) => {
			const errorRes = value(nationalityId)

			return {
				code: errorRes.code,
				message: errorRes.message,
			}
		},
	)

	const errorResponse = errorResponses.find(
		(errorRes) => errorRes.code === response.status(),
	)

	return errorResponse
		? errorResponse
		: getMyPertaminaErrorResponse('INTERNAL_SERVER_ERROR')
}

export async function verifyCustomer(
	auth: UserAuth,
	nationalityId: Customer['nationalityId'],
): Promise<Customer | ErrorResponse> {
	const browser = await createBrowser()
	const page = await setupPage(browser)

	await setupAuth(page, auth)
	await page.goto(VERIFY_NATIONALITY_ID_URL)

	const profileRes = await page.waitForResponse(
		(response) =>
			response.url() === PROFILE_ENDPOINT &&
			response.request().method().toUpperCase() !== 'OPTIONS',
	)

	if (!profileRes.ok()) {
		await browser.close()

		return getMyPertaminaErrorResponse('INVALID_COOKIES')
	}

	await page.locator('[type="search"]').fill(nationalityId)
	await page.locator('[data-testid="btnCheckNik"]').click()

	const verifyNationalityIdResponse = await page.waitForResponse(
		(response) =>
			response.url() ===
				`${VERIFY_NATIONALITY_ID_ENDPOINT}?nationalityId=${nationalityId}` &&
			response.request().method().toUpperCase() != 'OPTIONS',
	)

	if (!verifyNationalityIdResponse.ok()) {
		await browser.close()

		return getVerifyNationalityIdErrorResponse(
			verifyNationalityIdResponse,
			nationalityId,
		)
	}

	const loginResBody: VerifyNationalityIdResponse =
		await verifyNationalityIdResponse.json()

	await browser.close()

	return customerDTO(loginResBody)
}
