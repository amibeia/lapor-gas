'use server'

import { checkCookieExpiration, setupAuth } from '@/actions/user'
import { productDTO } from '@/lib/dto'
import {
	PRODUCT_ENDPOINT,
	PRODUCT_URL,
	ProductResponse,
} from '@/lib/my-pertamina'
import { createBrowser, setupPage } from '@/lib/puppeteer'
import { UserAuth } from '@/lib/types'
import { getMyPertaminaErrorResponse } from '@/lib/utils'

export async function getProduct(auth: UserAuth) {
	const browser = await createBrowser()
	const page = await setupPage(browser)

	await setupAuth(page, auth)
	await page.goto(PRODUCT_URL)

	const cookieError = await checkCookieExpiration(page, PRODUCT_URL)
	if (cookieError) {
		await browser.close()

		return cookieError
	}

	const productRes = await page.waitForResponse(
		(response) =>
			response.url() === PRODUCT_ENDPOINT &&
			response.request().method().toUpperCase() !== 'OPTIONS',
	)

	if (!productRes.ok()) {
		await browser.close()

		return getMyPertaminaErrorResponse('INTERNAL_SERVER_ERROR')
	}

	const productResBody: ProductResponse = await productRes.json()

	await browser.close()

	return productDTO(productResBody)
}
