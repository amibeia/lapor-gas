import { ArrowDownIcon, ChevronDownIcon } from 'lucide-react'

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
import UserCredentialForm from '@/components/user/user-credential-form'

export default function UserAuthenticationDrawer() {
	return (
		<Drawer>
			<div className="bg-secondary text-secondary-foreground flex size-fit items-center justify-center gap-2 rounded-full p-1 shadow-sm">
				<Avatar className="shrink-0">
					<AvatarImage src="assets/default-avatar.svg" />
					<AvatarFallback>DA</AvatarFallback>
				</Avatar>
				<DrawerTrigger asChild>
					<Button variant="ghost" size="icon" className="shrink-0 rounded-full">
						<ChevronDownIcon className="size-4 shrink-0" />
					</Button>
				</DrawerTrigger>
			</div>
			<DrawerContent className="mx-auto max-w-xl">
				<DrawerHeader>
					<DrawerTitle className="font-sans">Autentikasi Akun</DrawerTitle>
					<DrawerDescription>
						Masukkan nomor telepon dan PIN untuk keamanan akun Anda.
					</DrawerDescription>
				</DrawerHeader>

				<section className="flex flex-1 flex-col gap-4 p-4">
					<UserCredentialForm />
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
