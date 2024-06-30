import { Cookie } from 'puppeteer'

import { CUSTOMER_PREFIX_ID, PROFILE_PREFIX_ID } from '@/lib/constants'
import {
	LoginResponse,
	ProfileResponse,
	VerifyNationalityIdResponse,
} from '@/lib/my-pertamina'
import { Customer, CustomerType, Profile, UserAuth } from '@/lib/types'
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

export function profileDTO({ data }: ProfileResponse): Profile {
	return {
		id: nanoId({ prefix: PROFILE_PREFIX_ID }),
		registrationId: data.registrationId,
		owner: {
			nationalityId: data.nationalityId,
			name: data.name,
			email: data.email,
			phoneNumber: data.phoneNumber,
			type: data.merchantType,
		},
		location: {
			address: data.address,
			village: data.villageName,
			district: data.ditrictName,
			city: data.city,
			province: data.province,
			zipCode: data.zipcode,
			coordinate: data.coordinate,
		},
		store: {
			name: data.storeName,
			address: data.storeAddress,
			phoneNumber: data.storePhoneNumber,
		},
		agent: {
			id: data.agen.id,
			name: data.agen.name,
		},
		settings: {
			isSubsidyProduct: data.isSubsidiProduct,
			isActiveMyptm: data.isActiveMyptm,
			isAvailableTransaction: data.isAvailableTransaction,
		},
	}
}
