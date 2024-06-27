'use client'

import { BadgeIcon, SquareCheckIcon, SquareIcon } from 'lucide-react'

import { Button, buttonVariants } from '@/components/ui/button'

import { Customer } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useCustomerActions, useSelectedNationalityIds } from '@/store/customer'

interface NationalityIdItemProps extends React.ComponentPropsWithoutRef<'div'> {
	nationalityId: Customer['nationalityId']
}

export default function NationalityIdItem({
	nationalityId,
	className,
	...props
}: NationalityIdItemProps) {
	const selectedNationalityIds = useSelectedNationalityIds()
	const customerActions = useCustomerActions()

	const isSelected = Boolean(
		selectedNationalityIds.find(
			(selectedNationalityId) => selectedNationalityId === nationalityId,
		),
	)

	const SelectedIcon = isSelected ? SquareCheckIcon : SquareIcon

	const handleClick = () => {
		customerActions.toggleNationalityId(nationalityId)
	}

	return (
		<div
			className={cn(
				buttonVariants({ variant: 'secondary', size: 'sm' }),
				'justify-between',
				className,
			)}
			{...props}
		>
			<div className="flex items-center gap-2">
				<Button
					variant="ghost"
					size="icon"
					onClick={handleClick}
					className="size-6 shrink-0 rounded-full"
				>
					<SelectedIcon className="size-4 shrink-0 fill-background" />
				</Button>
				<span className="font-mono font-semibold">{nationalityId}</span>
			</div>
			<BadgeIcon className="size-4 shrink-0 fill-background" />
		</div>
	)
}
