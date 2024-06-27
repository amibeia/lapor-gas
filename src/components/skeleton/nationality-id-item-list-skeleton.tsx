import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'

import { cn } from '@/lib/utils'

interface NationalityIdItemListSkeletonProps
	extends React.ComponentPropsWithoutRef<typeof ScrollArea> {}

export default function NationalityIdItemListSkeleton(
	props: NationalityIdItemListSkeletonProps,
) {
	const size = 20

	return (
		<ScrollArea {...props}>
			<section className="flex flex-col gap-2">
				{Array.from({ length: size }, (_, index) => index + 1).map(
					(id, index) => (
						<Skeleton
							key={id}
							className={cn(
								'h-9 w-full',
								index === 0 && 'mt-4',
								index === size - 1 && 'mb-4',
							)}
						/>
					),
				)}
			</section>
		</ScrollArea>
	)
}
