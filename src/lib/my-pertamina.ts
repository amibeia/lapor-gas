import { ErrorResponse } from '@/lib/types'

export const LOGIN_URL =
	'https://subsiditepatlpg.mypertamina.id/merchant/auth/login'
export const VERIFY_NATIONALITY_ID_URL =
	'https://subsiditepatlpg.mypertamina.id/merchant/app/verification-nik'
export const PROFILE_URL =
	'https://subsiditepatlpg.mypertamina.id/merchant/app/profile-merchant'
export const PRODUCT_URL =
	'https://subsiditepatlpg.mypertamina.id/merchant/app/manage-product'

export const LOGIN_ENDPOINT =
	'https://api-map.my-pertamina.id/general/v1/users/login'
export const PROFILE_ENDPOINT =
	'https://api-map.my-pertamina.id/general/v1/users/profile'
export const VERIFY_NATIONALITY_ID_ENDPOINT =
	'https://api-map.my-pertamina.id/customers/v1/verify-nik'
export const PRODUCT_ENDPOINT =
	'https://api-map.my-pertamina.id/general/v2/products'

export const MY_PERTAMINA_DELAY = 60 * 1000

export const MY_PERTAMINA_ERRORS = [
	'INVALID_CREDENTIALS',
	'INVALID_COOKIES',
	'INVALID_NATIONALITY_ID',
	'CUSTOMER_NOT_FOUND',
	'TOO_MANY_REQUEST',
	'INTERNAL_SERVER_ERROR',
] as const

export type MyPertaminaError = (typeof MY_PERTAMINA_ERRORS)[number]

export const MY_PERTAMINA_ERROR_RESPONSE: Record<
	MyPertaminaError,
	(value?: string) => ErrorResponse
> = {
	INVALID_CREDENTIALS: () => ({
		code: 401,
		message: 'Login gagal. Nomor telepon atau PIN salah. Harap coba lagi.',
	}),
	INVALID_COOKIES: () => ({
		code: 401,
		message: 'Sesi Anda telah berakhir. Harap login kembali untuk melanjutkan.',
	}),
	INVALID_NATIONALITY_ID: (nationalityId) => ({
		code: 400,
		message: `NIK ${nationalityId} tidak valid. Mohon periksa kembali NIK yang Anda masukkan.`,
	}),
	CUSTOMER_NOT_FOUND: (nationalityId) => ({
		code: 404,
		message: `Pelanggan dengan NIK ${nationalityId} tidak ditemukan. Mohon daftarkan pelanggan terlebih dahulu.`,
	}),
	TOO_MANY_REQUEST: () => ({
		code: 429,
		message:
			'Terlalu banyak permintaan. Mohon tunggu 1 menit sebelum mencoba lagi.',
	}),
	INTERNAL_SERVER_ERROR: () => ({
		code: 500,
		message: 'Terjadi kesalahan yang tidak diketahui. Mohon coba lagi nanti.',
	}),
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

type QuotaRemaining = {
	individu: number
	family: number
}

type CustomerType = {
	name: string
	sourceTypeId: number
	status: number
	verifications: any[]
}

type VerifyNationalityIdData = {
	nationalityId: string
	name: string
	email: string
	phoneNumber: string
	businessType: string
	quotaRemaining: QuotaRemaining
	customerTypes: CustomerType[]
	channelInject: string
	isAgreedTermsConditions: boolean
	isCompleted: boolean
	isSubsidi: boolean
}

type Agen = {
	id: string
	name: string
}

type Bank = {
	bankName: any
	accountName: any
	accountNumber: any
}

type ProfileData = {
	registrationId: string
	name: string
	address: string
	city: string
	province: string
	coordinate: string
	storeName: string
	storeAddress: string
	phoneNumber: string
	tid: string
	mid: any
	spbu: string
	merchantType: string
	midMap: string
	isSubsidiProduct: boolean
	storePhoneNumber: string
	email: string
	nationalityId: string
	ditrictName: string
	villageName: string
	zipcode: string
	agen: Agen
	isActiveMyptm: boolean
	bank: Bank
	myptmActivationStatus: any
	isAvailableTransaction: boolean
}

type ProductData = {
	registrationId: string
	storeName: string
	productId: string
	productName: string
	stockAvailable: number
	stockRedeem: number
	sold: number
	modal: number
	price: number
	productMinPrice: number
	productMaxPrice: number
	image: string
	stockDate: string
	lastStock: number
	lastStockDate: string
	lastSyncAt: string
}

export type LoginResponse = Response<LoginData>
export type VerifyNationalityIdResponse = Response<VerifyNationalityIdData>
export type ProfileResponse = Response<ProfileData>
export type ProductResponse = Response<ProductData>
