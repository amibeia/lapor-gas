'use client'

import { LoaderCircleIcon, SquareCheckIcon, SquareIcon } from 'lucide-react'
import { forwardRef } from 'react'

import { Button, buttonVariants } from '@/components/ui/button'

import { Customer } from '@/lib/types'
import { cn } from '@/lib/utils'
import {
	useCustomerActions,
	useProceedNationalityId,
	useSelectedNationalityIds,
} from '@/store/customer'

interface NationalityIdItemProps extends React.ComponentPropsWithoutRef<'div'> {
	nationalityId: Customer['nationalityId']
}

const NationalityIdItem = forwardRef<HTMLDivElement, NationalityIdItemProps>(
	({ nationalityId, className, ...props }, ref) => {
		const selectedNationalityIds = useSelectedNationalityIds()
		const proceedNationalityId = useProceedNationalityId()
		const customerActions = useCustomerActions()

		const isProceed = proceedNationalityId === nationalityId
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
				ref={ref}
				className={cn(
					buttonVariants({
						variant: isProceed ? 'default' : 'secondary',
						size: 'sm',
					}),
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
						<SelectedIcon className="size-4 shrink-0 fill-background text-foreground" />
					</Button>
					<span className="font-mono font-semibold">{nationalityId}</span>
				</div>
				{isProceed && (
					<LoaderCircleIcon className="size-4 shrink-0 animate-spin" />
				)}
			</div>
		)
	},
)
NationalityIdItem.displayName = 'NationalityIdItem'

export default NationalityIdItem
