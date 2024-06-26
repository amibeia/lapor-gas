'use client'

import { LoaderCircleIcon, LogInIcon, LogOutIcon } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

import { login, logout } from '@/actions/user'
import { isErrorResponse } from '@/lib/utils'
import { useUserActions, useUserAuth, useUserCredential } from '@/store/user'

interface UserCredentialActionsProps {
	onSubmit: () => void
}

export default function UserCredentialActions({
	onSubmit,
}: UserCredentialActionsProps) {
	const userCredential = useUserCredential()
	const userAuth = useUserAuth()
	const userActions = useUserActions()

	const handleLogoutAction = async () => {
		if (!userAuth) return

		const logoutRes = await logout(userAuth)

		userActions.setAuth(null)

		if (isErrorResponse(logoutRes)) {
			toast.error(logoutRes.message)
		} else {
			toast.success('Logout berhasil! Anda telah keluar dari akun.')
		}

		onSubmit()
	}

	const handleLoginAction = async () => {
		if (!userCredential) return

		const loginRes = await login(userCredential.phoneNumber, userCredential.pin)
		if (isErrorResponse(loginRes)) {
			return toast.error(loginRes.message)
		}

		userActions.setAuth(loginRes)
		toast.success('Login berhasil! Selamat datang kembali.')

		onSubmit()
	}

	return (
		<div className="flex items-center gap-2">
			<form action={handleLogoutAction}>
				<LogoutButton />
			</form>
			<form action={handleLoginAction}>
				<LoginButton />
			</form>
		</div>
	)
}

function LogoutButton() {
	const userAuth = useUserAuth()
	const { pending } = useFormStatus()

	return (
		<Button
			variant="secondary"
			disabled={!userAuth || pending}
			className="gap-2"
		>
			{pending ? (
				<LoaderCircleIcon className="size-4 shrink-0 animate-spin" />
			) : (
				<LogOutIcon className="size-4 shrink-0" />
			)}
			<span>Logout</span>
		</Button>
	)
}

function LoginButton() {
	const userCredential = useUserCredential()
	const userAuth = useUserAuth()
	const { pending } = useFormStatus()

	return (
		<Button
			disabled={!!userAuth || !userCredential || pending}
			className="gap-2"
		>
			{pending ? (
				<LoaderCircleIcon className="size-4 shrink-0 animate-spin" />
			) : (
				<LogInIcon className="size-4 shrink-0" />
			)}
			<span>Login</span>
		</Button>
	)
}
