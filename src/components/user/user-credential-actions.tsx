'use client'

import { LoaderCircleIcon, LogInIcon, LogOutIcon } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

import { login, logout } from '@/actions/user'
import { isErrorResponse } from '@/lib/utils'
import { useAuth, useCredential, useUserActions } from '@/store/user'

interface UserCredentialActionsProps {
	onSubmit: () => void
}

export default function UserCredentialActions({
	onSubmit,
}: UserCredentialActionsProps) {
	const credential = useCredential()
	const auth = useAuth()
	const userActions = useUserActions()

	const handleLogoutAction = async () => {
		if (!auth) return

		const logoutRes = await logout(auth)

		userActions.setAuth(null)

		if (isErrorResponse(logoutRes)) {
			toast.error(logoutRes.message)
		} else {
			toast.success('Logout berhasil! Anda telah keluar dari akun.')
		}

		onSubmit()
	}

	const handleLoginAction = async () => {
		if (!credential) return

		const loginRes = await login(credential.phoneNumber, credential.pin)
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
	const auth = useAuth()
	const { pending } = useFormStatus()

	return (
		<Button variant="secondary" disabled={!auth || pending} className="gap-2">
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
	const credential = useCredential()
	const auth = useAuth()
	const { pending } = useFormStatus()

	return (
		<Button disabled={!!auth || !credential || pending} className="gap-2">
			{pending ? (
				<LoaderCircleIcon className="size-4 shrink-0 animate-spin" />
			) : (
				<LogInIcon className="size-4 shrink-0" />
			)}
			<span>Login</span>
		</Button>
	)
}
