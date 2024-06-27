'use client'

import { SquareCheckIcon, SquareIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
	useCustomerActions,
	useNationalityIds,
	useSelectedNationalityIds,
} from '@/store/customer'

export default function SelectAllNationalityIdsButton() {
	const nationalityIds = useNationalityIds()
	const selectedNationalityIds = useSelectedNationalityIds()
	const customerActions = useCustomerActions()

	const handleClick = () => {
		customerActions.toggleAllSelectedNationalityIds()
	}

	const isSelectAll = selectedNationalityIds.length === nationalityIds.length

	const Icon = isSelectAll ? SquareCheckIcon : SquareIcon

	return (
		<Button variant="ghost" size="sm" onClick={handleClick} className="gap-2">
			<Icon className="size-4 shrink-0" />
			<span>{isSelectAll ? 'Hapus Pilihan' : 'Pilih Semua'}</span>
		</Button>
	)
}
