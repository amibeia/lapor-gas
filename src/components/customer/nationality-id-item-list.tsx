'use client'

import { UserRoundXIcon } from 'lucide-react'

import NationalityIdItem from '@/components/customer/nationality-id-item'
import { ScrollArea } from '@/components/ui/scroll-area'

import { TOAST_INFO_BG_COLOR, TOAST_INFO_TEXT_COLOR } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useNationalityIds } from '@/store/customer'

interface NationalityIdItemListProps
	extends React.ComponentPropsWithoutRef<typeof ScrollArea> {}

export default function NationalityIdItemList(
	props: NationalityIdItemListProps,
) {
	const nationalityIds = useNationalityIds()

	return nationalityIds.length !== 0 ? (
		<ScrollArea {...props}>
			<section className="flex flex-col gap-2">
				{nationalityIds.map((customerNationalityId, index) => (
					<NationalityIdItem
						key={customerNationalityId}
						nationalityId={customerNationalityId}
						className={cn(
							index === 0 && 'mt-4',
							index === nationalityIds.length - 1 && 'mb-4',
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
			<p className="text-pretty text-center text-xs font-light">
				Tidak ada NIK pelanggan yang tersedia untuk diverifikasi. Mohon
				tambahkan NIK pelanggan terlebih dahulu.
			</p>
		</div>
	)
}
