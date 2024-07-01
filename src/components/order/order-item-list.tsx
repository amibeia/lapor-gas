'use client'

import { UserRoundXIcon } from 'lucide-react'

import OrderItem from '@/components/order/order-item'
import { ScrollArea } from '@/components/ui/scroll-area'

import { TOAST_INFO_BG_COLOR, TOAST_INFO_TEXT_COLOR } from '@/lib/constants'
import { useCustomers } from '@/store/customer'

interface OrderItemListProps
	extends React.ComponentPropsWithoutRef<typeof ScrollArea> {}

export default function OrderItemList(props: OrderItemListProps) {
	const customers = useCustomers()

	return customers.length !== 0 ? (
		<ScrollArea {...props}>
			<section className="grid-cols-auto-fit-250 grid gap-2">
				{customers.map((customer, index) => (
					<OrderItem key={customer.id} customer={customer} />
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
				Tidak ada pelanggan yang sudah terverifikasi. Mohon verifikasi pelanggan
				terlebih dahulu.
			</p>
		</div>
	)
}
