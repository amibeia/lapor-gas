import { Cookie } from 'puppeteer'
import { CUSTOMER_TYPES } from './constants'

export type UserCredential = {
	phoneNumber: string
	pin: string
}

export type AuthSettings = {
	isLogin: boolean
	myptmMerchantType: string
	isDefaultPin: boolean
	isNewUserMyptm: boolean
	isSubsidiProduct: boolean
}

export type UserAuth = {
	cookies: Cookie[]
	accessToken: string
	settings: AuthSettings
}

export type CustomerType = (typeof CUSTOMER_TYPES)[number]
export type Customer = {
	id: string
	nationalityId: string
	name: string
	email: string
	phoneNumber: string
	types: CustomerType[]
	channel: string
	quotas: {
		houseHold: number
		microBusiness: number
	}
	flags: {
		isAgreedTermsConditions: boolean
		isCompleted: boolean
		isSubsidy: boolean
	}
}

export type ErrorResponse = {
	code: number
	message: string
}

export type MutableRefList<T> = Array<
	React.RefCallback<T> | React.MutableRefObject<T> | undefined | null
>

export type NanoIdArgs = {
	prefix?: string
	size?: number
}
