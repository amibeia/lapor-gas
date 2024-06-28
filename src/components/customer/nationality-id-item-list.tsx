'use client'

import { UserRoundXIcon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import NationalityIdItem from '@/components/customer/nationality-id-item'
import { ScrollArea } from '@/components/ui/scroll-area'

import {
	QUERY_PARAM,
	TOAST_INFO_BG_COLOR,
	TOAST_INFO_TEXT_COLOR,
} from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useNationalityIds, useProceedNationalityId } from '@/store/customer'

interface NationalityIdItemListProps
	extends React.ComponentPropsWithoutRef<typeof ScrollArea> {}

export default function NationalityIdItemList(
	props: NationalityIdItemListProps,
) {
	const nationalityIds = useNationalityIds()
	const proceedNationalityId = useProceedNationalityId()
	const searchParams = useSearchParams()
	const autoFocusRef =
		useRef<React.ComponentRef<typeof NationalityIdItem>>(null)

	const query = searchParams.get(QUERY_PARAM) || ''
	const filteredNationalityIds = nationalityIds.filter((nationalityId) =>
		nationalityId.startsWith(query),
	)

	useEffect(() => {
		proceedNationalityId &&
			autoFocusRef.current &&
			autoFocusRef.current.scrollIntoView({ behavior: 'smooth' })
	}, [proceedNationalityId])

	return filteredNationalityIds.length !== 0 ? (
		<ScrollArea {...props}>
			<section className="flex flex-col gap-2">
				{filteredNationalityIds.map((customerNationalityId, index) => (
					<NationalityIdItem
						ref={
							customerNationalityId === proceedNationalityId
								? autoFocusRef
								: null
						}
						key={customerNationalityId}
						nationalityId={customerNationalityId}
						className={cn(
							index === 0 && 'mt-4',
							index === filteredNationalityIds.length - 1 && 'mb-4',
						)}
					/>
				))}
			</section>
		</ScrollArea>
	) : (
		<div className="flex flex-1 flex-col items-center justify-center gap-2">
			<div
				style={{ background: TOAST_INFO_BG_COLOR }}
				className="flex items-center justify-center rounded-full p-2"
			>
				<UserRoundXIcon
					style={{ color: TOAST_INFO_TEXT_COLOR }}
					className="size-8 shrink-0"
				/>
			</div>
			<p className="max-w-[340px] text-pretty text-center text-xs font-light">
				Tidak ada NIK pelanggan yang tersedia untuk diverifikasi. Mohon
				tambahkan NIK pelanggan terlebih dahulu.
			</p>
		</div>
	)
}
