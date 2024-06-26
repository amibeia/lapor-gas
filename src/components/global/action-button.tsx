'use client'

import { LucideIcon } from 'lucide-react'
import { forwardRef } from 'react'

import { Button, ButtonProps } from '@/components/ui/button'

import { cn } from '@/lib/utils'

interface ActionButtonProps extends ButtonProps {
	label?: string
	icon: LucideIcon
}

const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
	({ label, icon: Icon, className, ...props }, ref) => {
		return (
			<div className="flex w-24 flex-col items-center justify-center gap-1">
				<Button
					ref={ref}
					variant="secondary"
					className={cn('size-20', className)}
					{...props}
				>
					<Icon className="size-16 shrink-0 fill-primary text-start text-foreground" />
				</Button>
				{label && (
					<span className="text-center text-xs font-medium">{label}</span>
				)}
			</div>
		)
	},
)
ActionButton.displayName = 'ActionButton'

export default ActionButton
