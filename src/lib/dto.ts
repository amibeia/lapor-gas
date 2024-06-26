import { Cookie } from 'puppeteer'

import { LoginResponse } from '@/lib/my-pertamina'
import { UserAuth } from '@/lib/types'

export function userAuthDTO(
	{ data }: LoginResponse,
	cookies: Cookie[],
): UserAuth {
	return {
		cookies,
		accessToken: data.accessToken,
		settings: {
			isLogin: data.isLogin,
			myptmMerchantType: data.myptmMerchantType,
			isDefaultPin: data.isDefaultPin,
			isNewUserMyptm: data.isNewUserMyptm,
			isSubsidiProduct: data.isSubsidiProduct,
		},
	}
}
