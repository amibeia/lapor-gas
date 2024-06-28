'use client'

import { ArrowDownIcon, BadgeCheckIcon } from 'lucide-react'
import { Suspense, lazy } from 'react'

import CustomerDelayCountDown from '@/components/customer/customer-delay-countdown'
import VerifyCustomerAction from '@/components/customer/verify-customer-action'
import ActionButton from '@/components/global/action-button'
import NationalityIdItemListSkeleton from '@/components/skeleton/nationality-id-item-list-skeleton'
import NationalityIdSearchSkeleton from '@/components/skeleton/nationality-id-search-skeleton'
import SelectAllNationalityIdsButtonSkeleton from '@/components/skeleton/select-all-nationality-ids-button-skeleton'
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

import { delay } from '@/lib/utils'
import { useNationalityIds, useSelectedNationalityIds } from '@/store/customer'
import { useIsDelayed } from '@/store/layout'

const NationalityIdSearch = lazy(async () => {
	const [moduleExports] = await Promise.all([
		import('@/components/customer/nationality-id-search'),
		delay(),
	])

	return moduleExports
})

const NationalityIdItemList = lazy(async () => {
	const [moduleExports] = await Promise.all([
		import('@/components/customer/nationality-id-item-list'),
		delay(),
	])

	return moduleExports
})

const SelectAllNationalityIdsButton = lazy(async () => {
	const [moduleExports] = await Promise.all([
		import('@/components/customer/select-all-nationality-ids-button'),
		delay(),
	])

	return moduleExports
})

export default function VerifyCustomersDrawer() {
	const nationalityIds = useNationalityIds()
	const selectedNationalityIds = useSelectedNationalityIds()
	const isDelayed = useIsDelayed()

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
				<section className="flex flex-1 flex-col overflow-auto">
					{nationalityIds.length !== 0 && (
						<section className="flex flex-wrap justify-between gap-4 px-4 pb-2 pt-4">
							<div className="flex flex-col gap-1">
								<Suspense fallback={<SelectAllNationalityIdsButtonSkeleton />}>
									<SelectAllNationalityIdsButton />
								</Suspense>
								<p className="ml-9 flex w-[100px] items-center gap-1 text-xs text-muted-foreground">
									<span>Terpilih</span>
									<span className="font-semibold text-primary">
										{selectedNationalityIds.length}
									</span>
									<span>NIK</span>
								</p>
							</div>
							<Suspense fallback={<NationalityIdSearchSkeleton />}>
								<NationalityIdSearch />
							</Suspense>
						</section>
					)}
					<Suspense
						fallback={<NationalityIdItemListSkeleton className="flex-1 px-4" />}
					>
						<NationalityIdItemList className="flex-1 px-4" />
					</Suspense>
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
						<div className="flex items-center gap-4">
							{isDelayed && <CustomerDelayCountDown />}
							<VerifyCustomerAction />
						</div>
					</div>
				</section>
			</DrawerContent>
		</Drawer>
	)
}
