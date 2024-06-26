import { ErrorResponse } from '@/lib/types'

export const LOGIN_URL =
	'https://subsiditepatlpg.mypertamina.id/merchant/auth/login'
export const VERIFY_NATIONALITY_ID_URL =
	'https://subsiditepatlpg.mypertamina.id/merchant/app/verification-nik'

export const LOGIN_ENDPOINT =
	'https://api-map.my-pertamina.id/general/v1/users/login'
export const PROFILE_ENDPOINT =
	'https://api-map.my-pertamina.id/general/v1/users/profile'

export const MY_PERTAMINA_ERRORS = [
	'INVALID_CREDENTIALS',
	'INVALID_COOKIES',
] as const

export type MyPertaminaError = (typeof MY_PERTAMINA_ERRORS)[number]

export const MY_PERTAMINA_ERROR_RESPONSE: Record<
	MyPertaminaError,
	ErrorResponse
> = {
	INVALID_CREDENTIALS: {
		code: 401,
		message: 'Login gagal. Nomor telepon atau PIN salah. Harap coba lagi.',
	},
	INVALID_COOKIES: {
		code: 401,
		message: 'Sesi Anda telah berakhir. Harap login kembali untuk melanjutkan.',
	},
}

export const USER_DATA_LOCAL_STORAGE_KEY = 'maplite_user_data'

type Response<T> = {
	success: boolean
	data: T
	message: string
	code: number
}

type LoginData = {
	accessToken: string
	isLogin: boolean
	myptmMerchantType: string
	isDefaultPin: boolean
	isNewUserMyptm: boolean
	isSubsidiProduct: boolean
}

export type LoginResponse = Response<LoginData>
