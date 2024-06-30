'use client'

import { BadgeCheckIcon, LoaderCircleIcon } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

import { verifyCustomer } from '@/actions/customer'
import { MY_PERTAMINA_DELAY } from '@/lib/my-pertamina'
import {
	delay,
	getMyPertaminaErrorResponse,
	isErrorResponse,
} from '@/lib/utils'
import { useCustomerActions, useSelectedNationalityIds } from '@/store/customer'
import { useLayoutActions } from '@/store/layout'
import { useProductActions } from '@/store/product'
import { useAuth, useUserActions } from '@/store/user'

export default function VerifyCustomerAction() {
	const auth = useAuth()
	const selectedNationalityIds = useSelectedNationalityIds()
	const userActions = useUserActions()
	const customerActions = useCustomerActions()
	const productActions = useProductActions()
	const layoutActions = useLayoutActions()

	const handleVerifyCustomerAction = async () => {
		if (!auth) return

		let index = 0
		while (index < selectedNationalityIds.length) {
			const selectedNationalityId = selectedNationalityIds[index]

			customerActions.setProceedNationalityId(selectedNationalityId)

			const verifyCustomerRes = await verifyCustomer(
				auth,
				selectedNationalityId,
			)

			if (
				isErrorResponse(verifyCustomerRes) &&
				verifyCustomerRes.code ===
					getMyPertaminaErrorResponse('INVALID_COOKIES').code
			) {
				toast.error(verifyCustomerRes.message)
				userActions.setAuth(null)
				userActions.setProfile(null)
				productActions.setProduct(null)
				break
			}

			if (
				isErrorResponse(verifyCustomerRes) &&
				verifyCustomerRes.code ===
					getMyPertaminaErrorResponse('TOO_MANY_REQUEST').code
			) {
				toast.error(verifyCustomerRes.message)
				customerActions.setProceedNationalityId(null)

				layoutActions.setIsDelayed(true)
				await delay(MY_PERTAMINA_DELAY)
				layoutActions.setIsDelayed(false)
				continue
			}

			if (isErrorResponse(verifyCustomerRes)) {
				toast.error(verifyCustomerRes.message)
				customerActions.setProceedNationalityId(null)
				customerActions.toggleNationalityId(selectedNationalityId)
				index += 1
				continue
			}

			customerActions.verifyCustomer({
				...verifyCustomerRes,
				nationalityId: selectedNationalityId,
			})
			customerActions.setProceedNationalityId(null)
			customerActions.toggleNationalityId(selectedNationalityId)
			toast.success(
				`Pelanggan dengan NIK ${selectedNationalityId} berhasil diverifikasi.`,
			)

			index += 1
		}
	}

	return (
		<div className="flex items-center gap-2">
			<form action={handleVerifyCustomerAction}>
				<VerifyCustomerButton />
			</form>
		</div>
	)
}

function VerifyCustomerButton() {
	const auth = useAuth()
	const selectedNationalityIds = useSelectedNationalityIds()
	const { pending } = useFormStatus()

	return (
		<Button
			disabled={!auth || selectedNationalityIds.length === 0 || pending}
			className="gap-2"
		>
			{pending ? (
				<LoaderCircleIcon className="size-4 shrink-0 animate-spin" />
			) : (
				<BadgeCheckIcon className="size-4 shrink-0" />
			)}
			<span>Verifikasi Pelanggan</span>
		</Button>
	)
}
