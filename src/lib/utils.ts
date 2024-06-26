import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { ErrorResponse, MutableRefList } from '@/lib/types'

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
