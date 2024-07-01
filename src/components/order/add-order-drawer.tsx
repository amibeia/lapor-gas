'use client'

import { ArrowDownIcon, ClipboardPlusIcon } from 'lucide-react'

import ActionButton from '@/components/global/action-button'
import OrderItemList from '@/components/order/order-item-list'
import { Button } from '@/components/ui/button'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { Separator } from '@/components/ui/separator'

export default function AddOrderDrawer() {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<ActionButton label="Tambah Pesanan" icon={ClipboardPlusIcon} />
			</DrawerTrigger>
			<DrawerContent className="mx-auto h-[90dvh] max-w-xl">
				<DrawerHeader>
					<DrawerTitle>Buat Pesanan Baru</DrawerTitle>
					<DrawerDescription>
						Gunakan form ini untuk membuat pesanan baru. Pastikan semua
						informasi benar sebelum mengirim pesanan.
					</DrawerDescription>
				</DrawerHeader>
				<section className="flex flex-1 flex-col gap-4 overflow-auto">
					<OrderItemList className="flex-1 px-4" />
					<Separator className="mb-4" />
					<div className="flex items-center justify-between gap-4 px-4 pb-4">
						<DrawerClose asChild>
							<Button
								variant="outline"
								size="icon"
								className="shrink-0 rounded-full"
							>
								<ArrowDownIcon className="size-4 shrink-0" />
							</Button>
						</DrawerClose>
					</div>
				</section>
			</DrawerContent>
		</Drawer>
	)
}
