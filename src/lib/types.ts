import { Cookie } from 'puppeteer'

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

export type Customer = {
	id: string
	nationalityId: string
}

export type ErrorResponse = {
	code: number
	message: string
}

export type MutableRefList<T> = Array<
	React.RefCallback<T> | React.MutableRefObject<T> | undefined | null
>
