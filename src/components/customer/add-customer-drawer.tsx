'use client'

import { ArrowDownIcon, UserPlusIcon } from 'lucide-react'

import AddCustomerForm from '@/components/customer/add-customer-form'
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

export default function AddCustomerDrawer() {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<ActionButton label="Tambah Pelanggan Baru" icon={UserPlusIcon} />
			</DrawerTrigger>
			<DrawerContent className="mx-auto max-w-xl">
				<DrawerHeader>
					<DrawerTitle>Tambahkan Pelanggan Baru</DrawerTitle>
					<DrawerDescription>
						Masukkan NIK pelanggan baru untuk mendaftarkan mereka ke sistem.
					</DrawerDescription>
				</DrawerHeader>
				<section className="flex flex-1 flex-col gap-4 p-4">
					<AddCustomerForm />
					<Separator />
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
