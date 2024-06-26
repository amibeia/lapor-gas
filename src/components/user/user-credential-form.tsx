'use client'

import { zodResolver } from '@hookform/resolvers/zod'
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

const FormSchema = z.object({
	phoneNumber: z
		.string()
		.min(MIN_PHONE_NUMBER_LENGTH)
		.max(MAX_PHONE_NUMBER_LENGTH),
	pin: z.string().length(PIN_LENGTH),
})

type FormSchemaType = z.infer<typeof FormSchema>

export default function UserCredentialForm() {
	const form = useForm<FormSchemaType>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			phoneNumber: '',
			pin: '',
		},
	})

	const onSubmit = (values: FormSchemaType) => {
		toast.success(
			'Data berhasil disimpan! Nomor telepon dan PIN Anda telah tersimpan dengan aman.',
		)

		form.reset()
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-wrap items-center gap-2"
			>
				<FormField
					control={form.control}
					name="phoneNumber"
					render={({ field }) => (
						<FormItem className="flex-grow basis-[120px] space-y-0">
							<FormLabel className="sr-only">Nomor telepon</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="number"
									autoFocus
									autoComplete="off"
									placeholder="Nomor telepon"
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
						<FormItem className="flex-grow basis-[60px] space-y-0">
							<FormLabel className="sr-only">PIN</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="password"
									autoComplete="off"
									placeholder="PIN"
									onChange={(event) => {
										event.target.value.length <= PIN_LENGTH
											? field.onChange(event)
											: toast.info(
													`PIN harus terdiri dari ${PIN_LENGTH} digit. Harap masukkan PIN yang valid.`,
												)
									}}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					disabled={!form.formState.isValid}
					className="flex-grow basis-[150px]"
				>
					Simpan Kredensial
				</Button>
			</form>
		</Form>
	)
}
