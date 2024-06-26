import type { Metadata } from 'next'

import ClientOnly from '@/components/global/client-only'
import { Toaster } from '@/components/ui/sonner'

import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'

import '@/styles/globals.css'

export const metadata: Metadata = {
	title: 'Lapor Gas',
	description: '',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn(
					'bg-background text-foreground font-sans antialiased',
					fontSans.variable,
				)}
			>
				{children}
				<ClientOnly>
					<Toaster />
				</ClientOnly>
			</body>
		</html>
	)
}
