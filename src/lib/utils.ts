import { clsx, type ClassValue } from 'clsx'
import { customAlphabet } from 'nanoid'
import { twMerge } from 'tailwind-merge'

import { LAZY_COMPONENT_DELAY } from '@/lib/constants'
import {
	MY_PERTAMINA_ERROR_RESPONSE,
	MyPertaminaError,
} from '@/lib/my-pertamina'
import { ErrorResponse, MutableRefList, NanoIdArgs } from '@/lib/types'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function isErrorResponse(obj: any): obj is ErrorResponse {
	return obj && typeof obj === 'object' && 'code' in obj && 'message' in obj
}

export function mergeRefs<T>(...refs: MutableRefList<T>): React.RefCallback<T> {
	return (val: T) => {
		setRef(val, ...refs)
	}
}

export function setRef<T>(val: T, ...refs: MutableRefList<T>): void {
	refs.forEach((ref) => {
		if (typeof ref === 'function') {
			ref(val)
		} else if (ref != null) {
			ref.current = val
		}
	})
}

export async function delay(duration: number = LAZY_COMPONENT_DELAY) {
	return new Promise((resolve) => setTimeout(resolve, duration))
}

export function kebabCase(words: string) {
	return words
		.split(' ')
		.map((word) => word.toLowerCase())
		.join('-')
}

export function titleCase(words: string) {
	return words
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')
}

export function nanoId(
	{ size = 10, prefix }: NanoIdArgs = { size: 10 },
): string {
	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

	return prefix && prefix.length !== 0
		? `${prefix}-${customAlphabet(alphabet, size)()}`
		: customAlphabet(alphabet, size)()
}

export function getMyPertaminaErrorResponse(
	type: MyPertaminaError,
	value?: string,
) {
	switch (type) {
		case 'INVALID_CREDENTIALS':
			return MY_PERTAMINA_ERROR_RESPONSE.INVALID_CREDENTIALS()
		case 'INVALID_COOKIES':
			return MY_PERTAMINA_ERROR_RESPONSE.INVALID_COOKIES()
		case 'INVALID_NATIONALITY_ID':
			return MY_PERTAMINA_ERROR_RESPONSE.INVALID_NATIONALITY_ID(value)
		case 'CUSTOMER_NOT_FOUND':
			return MY_PERTAMINA_ERROR_RESPONSE.CUSTOMER_NOT_FOUND(value)
		case 'TOO_MANY_REQUEST':
			return MY_PERTAMINA_ERROR_RESPONSE.TOO_MANY_REQUEST()
		case 'INTERNAL_SERVER_ERROR':
			return MY_PERTAMINA_ERROR_RESPONSE.INTERNAL_SERVER_ERROR()
	}
}

export function millisecondsToTime(milliseconds: number) {
	const seconds = Math.floor(milliseconds / 1000)
	const minutes = Math.floor(seconds / 60)
	const hours = Math.floor(minutes / 60)

	return {
		seconds: seconds % 60,
		minutes: minutes % 60,
		hours: hours % 24,
	}
}

export function toTwoDigits(num: number) {
	return num.toLocaleString('en-US', {
		minimumIntegerDigits: 2,
		useGrouping: false,
	})
}
