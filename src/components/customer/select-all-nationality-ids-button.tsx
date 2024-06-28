'use client'

import { SquareCheckIcon, SquareIcon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'

import { QUERY_PARAM } from '@/lib/constants'
import {
	useCustomerActions,
	useNationalityIds,
	useSelectedNationalityIds,
} from '@/store/customer'

export default function SelectAllNationalityIdsButton() {
	const nationalityIds = useNationalityIds()
	const selectedNationalityIds = useSelectedNationalityIds()
	const customerActions = useCustomerActions()
	const searchParams = useSearchParams()

	const query = searchParams.get(QUERY_PARAM) || ''
	const filteredNationalityIds = nationalityIds.filter((nationalityId) =>
		nationalityId.startsWith(query),
	)

	const isSelectAll =
		selectedNationalityIds.length === filteredNationalityIds.length
	const Icon = isSelectAll ? SquareCheckIcon : SquareIcon

	const handleClick = () => {
		customerActions.toggleAllSelectedNationalityIds(filteredNationalityIds)
	}

	return (
		<Button
			variant="ghost"
			size="sm"
			onClick={handleClick}
			className="w-[140px] flex-grow-0 justify-start gap-2"
		>
			<Icon className="size-4 shrink-0" />
			<span>{isSelectAll ? 'Hapus Pilihan' : 'Pilih Semua'}</span>
		</Button>
	)
}
