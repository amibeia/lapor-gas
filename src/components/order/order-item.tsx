'use client'

import {
	AntennaIcon,
	BadgeCheckIcon,
	KeyRoundIcon,
	PersonStandingIcon,
	SquareCheckIcon,
	SquareIcon,
} from 'lucide-react'
import React, { Fragment } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { Customer } from '@/lib/types'
import { cn, titleCase } from '@/lib/utils'
import { useOrderActions, useOrders } from '@/store/order'

interface OrderItemProps extends React.ComponentPropsWithoutRef<'div'> {
	customer: Customer
}

export default function OrderItem({
	customer,
	className,
	...props
}: OrderItemProps) {
	const orders = useOrders()
	const orderActions = useOrderActions()

	const isSelected = Boolean(
		orders.find((order) => order.nationalityId === customer.nationalityId),
	)
	const SelectedIcon = isSelected ? SquareCheckIcon : SquareIcon

	const handleClick = () => {
		orderActions.toggleOrder(customer.nationalityId)
	}

	return (
		<div
			className={cn(
				buttonVariants({
					variant: isSelected ? 'default' : 'secondary',
					size: 'sm',
				}),
				'h-full flex-col items-start gap-6 p-4',
				className,
			)}
			{...props}
		>
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2">
					<KeyRoundIcon className="size-4 shrink-0" />
					<span className="font-mono font-bold">{customer.nationalityId}</span>
				</div>
				<div className="flex items-center gap-2">
					<PersonStandingIcon className="size-4 shrink-0" />
					<span className="text-xs">{customer.name}</span>
				</div>
				<div className="flex items-center gap-2">
					<AntennaIcon className="size-4 shrink-0" />
					<span className="text-xs">{customer.channel.toUpperCase()}</span>
				</div>
				<div className="flex items-center gap-2">
					<BadgeCheckIcon className="size-4 shrink-0" />
					{customer.types.map((type, index) => (
						<Fragment key={type}>
							<span className="text-xs">{titleCase(type)}</span>
							{index !== customer.types.length - 1 && (
								<Separator orientation="vertical" className="h-4" />
							)}
						</Fragment>
					))}
				</div>
			</div>
		</div>
	)
}
