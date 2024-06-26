'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import {
	MAX_PHONE_NUMBER_LENGTH,
	MIN_PHONE_NUMBER_LENGTH,
	PIN_LENGTH,
} from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useCredential, useUserActions } from '@/store/user'

const FormSchema = z.object({
	phoneNumber: z
		.string()
		.min(MIN_PHONE_NUMBER_LENGTH)
		.max(MAX_PHONE_NUMBER_LENGTH),
	pin: z.string().length(PIN_LENGTH),
})

type FormSchemaType = z.infer<typeof FormSchema>

interface UserCredentialFormProps
	extends React.ComponentPropsWithoutRef<'form'> {}

export default function UserCredentialForm({
	className,
	...props
}: UserCredentialFormProps) {
	const [isEdit, setIsEdit] = useState(false)
	const [isShowPin, setIsShowPin] = useState(false)
	const credential = useCredential()
	const userActions = useUserActions()

	const form = useForm<FormSchemaType>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			phoneNumber: credential ? credential.phoneNumber : '',
			pin: credential ? credential.pin : '',
		},
	})

	const onSubmit = (userCredential: FormSchemaType) => {
		if (credential && !isEdit) {
			return setIsEdit(true)
		}

		if (
			credential &&
			credential.phoneNumber === userCredential.phoneNumber &&
			credential.pin === userCredential.pin
		) {
			return toast.info(
				'Perubahan tidak tersimpan. Data baru sama dengan data sebelumnya.',
			)
		}

		userActions.setCredential(userCredential)
		toast.success(
			credential
				? 'Data berhasil disimpan! Nomor telepon dan PIN Anda telah tersimpan dengan aman.'
				: 'Perubahan berhasil! Nomor telepon dan PIN Anda telah diperbarui.',
		)

		setIsEdit(false)
		setIsShowPin(false)
	}

	const isEditMode = !!credential && !isEdit
	const ShowPinIcon = isShowPin ? EyeOffIcon : EyeIcon

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={cn('flex flex-wrap items-center gap-2', className)}
				{...props}
			>
				<FormField
					control={form.control}
					name="phoneNumber"
					render={({ field }) => (
						<FormItem className="flex-grow basis-[135px] space-y-0">
							<FormLabel className="sr-only">Nomor telepon</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="number"
									pattern="[0-9]*"
									inputMode="numeric"
									autoFocus
									autoComplete="off"
									placeholder="Nomor telepon"
									disabled={isEditMode}
									onChange={(event) => {
										event.target.value.length <= MAX_PHONE_NUMBER_LENGTH
											? field.onChange(event)
											: toast.info(
													`Nomor telepon harus antara ${MIN_PHONE_NUMBER_LENGTH} hingga ${MAX_PHONE_NUMBER_LENGTH} digit. Harap masukkan nomor yang valid.`,
												)
									}}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="pin"
					render={({ field }) => (
						<FormItem className="flex-grow basis-[95px] space-y-0">
							<FormLabel className="sr-only">PIN</FormLabel>
							<FormControl>
								<div className="relative">
									<Input
										{...field}
										type={isShowPin ? 'text' : 'password'}
										pattern="[0-9]*"
										inputMode="numeric"
										autoComplete="off"
										placeholder="PIN"
										disabled={isEditMode}
										onChange={(event) => {
											event.target.value.length <= PIN_LENGTH
												? field.onChange(event)
												: toast.info(
														`PIN harus terdiri dari ${PIN_LENGTH} digit. Harap masukkan PIN yang valid.`,
													)
										}}
									/>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										disabled={isEditMode}
										onClick={() => setIsShowPin((prevState) => !prevState)}
										className="absolute inset-y-2 right-2 size-6 shrink-0 rounded-full"
									>
										<ShowPinIcon className="size-4 shrink-0 text-muted-foreground" />
									</Button>
								</div>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					variant={isEditMode ? 'secondary' : 'default'}
					disabled={!form.formState.isValid}
					className="flex-grow basis-[150px]"
				>
					{!!credential && !isEdit
						? 'Edit Data'
						: !!credential && isEdit
							? 'Simpan Perubahan'
							: !credential && !isEdit
								? 'Simpan Kredensial'
								: ''}
				</Button>
			</form>
		</Form>
	)
}
