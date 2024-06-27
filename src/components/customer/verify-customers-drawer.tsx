'use client'

import { ArrowDownIcon, BadgeCheckIcon } from 'lucide-react'

import NationalityIdItemList from '@/components/customer/nationality-id-item-list'
import SelectAllNationalityIdsButton from '@/components/customer/select-all-nationality-ids-button'
import ActionButton from '@/components/global/action-button'
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

export default function VerifyCustomersDrawer() {
	return (
		<Drawer dismissible={false}>
			<DrawerTrigger asChild>
				<ActionButton label="Verifikasi Pelanggan" icon={BadgeCheckIcon} />
			</DrawerTrigger>
			<DrawerContent className="mx-auto h-[90dvh] max-w-xl">
				<DrawerHeader>
					<DrawerTitle>Verifikasi NIK Pelanggan</DrawerTitle>
					<DrawerDescription>
						Pilih dan verifikasi NIK pelanggan di sini.
					</DrawerDescription>
				</DrawerHeader>
				<section className="flex flex-1 flex-col overflow-auto p-4">
					<section className="flex items-center">
						<SelectAllNationalityIdsButton />
					</section>
					<NationalityIdItemList className="flex-1 px-4" />
					<Separator className="mb-4" />
					<div className="flex items-center justify-between gap-4">
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
