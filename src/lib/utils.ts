import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { ErrorResponse } from '@/lib/types'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function isErrorResponse(obj: any): obj is ErrorResponse {
	return obj && typeof obj === 'object' && 'code' in obj && 'message' in obj
}
