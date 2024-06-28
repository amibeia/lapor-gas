'use client'

import { SearchIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

import { Input } from '@/components/ui/input'

import { NATIONALITY_ID_LENGTH, QUERY_PARAM } from '@/lib/constants'

export default function NationalityIdSearch() {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const query = searchParams.get(QUERY_PARAM) || ''

	const handleChange = ({
		target: { value },
	}: React.ChangeEvent<HTMLInputElement>) => {
		if (value.length > NATIONALITY_ID_LENGTH) {
			return toast.info(
				`NIK terlalu panjang. Harap masukkan NIK yang valid dengan ${NATIONALITY_ID_LENGTH} digit.`,
			)
		}

		const urlSearchParams = new URLSearchParams(searchParams)

		value
			? urlSearchParams.set(QUERY_PARAM, value)
			: urlSearchParams.delete(QUERY_PARAM)

		router.replace(`${pathname}?${urlSearchParams.toString()}`)
	}

	return (
		<div className="relative basis-[200px]">
			<SearchIcon className="absolute inset-y-3 left-3 size-4 shrink-0" />
			<Input
				type="search"
				autoComplete="off"
				placeholder="NIK"
				defaultValue={query}
				onChange={handleChange}
				className="pl-8"
			/>
		</div>
	)
}
