import { Cookie } from 'puppeteer'

import { CUSTOMER_PREFIX_ID } from '@/lib/constants'
import { LoginResponse, VerifyNationalityIdResponse } from '@/lib/my-pertamina'
import { Customer, CustomerType, UserAuth } from '@/lib/types'
import { kebabCase, nanoId } from '@/lib/utils'

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

export function customerDTO({ data }: VerifyNationalityIdResponse): Customer {
	return {
		id: nanoId({ prefix: CUSTOMER_PREFIX_ID }),
		nationalityId: data.nationalityId,
		name: data.name,
		email: data.email,
		phoneNumber: data.phoneNumber,
		types: data.customerTypes.map(
			(customerType) => kebabCase(customerType.name) as CustomerType,
		),
		channel: data.channelInject,
		quotas: {
			houseHold: data.quotaRemaining.family,
			microBusiness: data.quotaRemaining.individu,
		},
		flags: {
			isAgreedTermsConditions: data.isAgreedTermsConditions,
			isCompleted: data.isCompleted,
			isSubsidy: data.isSubsidi,
		},
	}
}
