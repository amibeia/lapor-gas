'use client'

import { ArrowDownIcon, ChevronDownIcon, UserRoundIcon } from 'lucide-react'
import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import UserCredentialActions from '@/components/user/user-credential-actions'
import UserCredentialForm from '@/components/user/user-credential-form'

import { useAuth } from '@/store/user'

export default function UserAuthenticationDrawer() {
	const [open, setOpen] = useState(false)
	const auth = useAuth()

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<div className="flex size-fit items-center justify-center gap-2 rounded-full bg-secondary p-1 text-secondary-foreground shadow-sm">
				<Avatar className="shrink-0">
					<AvatarImage src={auth ? 'assets/default-avatar.svg' : ''} />
					<AvatarFallback>
						<UserRoundIcon className="size-4 shrink-0" />
					</AvatarFallback>
				</Avatar>
				<DrawerTrigger asChild>
					<Button variant="ghost" size="icon" className="shrink-0 rounded-full">
						<ChevronDownIcon className="size-4 shrink-0" />
					</Button>
				</DrawerTrigger>
			</div>
			<DrawerContent className="mx-auto max-w-xl">
				<DrawerHeader>
					<DrawerTitle>Autentikasi Akun</DrawerTitle>
					<DrawerDescription>
						Masukkan nomor telepon dan PIN untuk keamanan akun Anda.
					</DrawerDescription>
				</DrawerHeader>
				<section className="flex flex-1 flex-col gap-4">
					<UserCredentialForm className="px-4 pt-4" />
					<Separator />
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
						<UserCredentialActions onSubmit={() => setOpen(false)} />
					</div>
				</section>
			</DrawerContent>
		</Drawer>
	)
}
