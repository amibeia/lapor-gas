'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRef } from 'react'
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

import { NATIONALITY_ID_LENGTH } from '@/lib/constants'
import { mergeRefs } from '@/lib/utils'
import { useCustomerActions, useNationalityIds } from '@/store/customer'

const FormSchema = z.object({
	nationalityId: z.string().length(NATIONALITY_ID_LENGTH),
})

type FormSchemaType = z.infer<typeof FormSchema>

export default function AddCustomerForm() {
	const nationalityIds = useNationalityIds()
	const customerActions = useCustomerActions()
	const autoFocusRef = useRef<React.ComponentRef<typeof Input>>(null)

	const form = useForm<FormSchemaType>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			nationalityId: '',
		},
	})

	const onSubmit = ({ nationalityId }: FormSchemaType) => {
		if (nationalityIds.find((nid) => nid === nationalityId)) {
			toast.error('NIK sudah terdaftar. Mohon masukkan NIK yang berbeda.')
		} else {
			customerActions.addNationalityId(nationalityId)
			toast.success('NIK baru berhasil ditambahkan.')

			form.reset()
		}

		if (autoFocusRef.current) {
			autoFocusRef.current.focus()
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-wrap items-center gap-2"
			>
				<FormField
					control={form.control}
					name="nationalityId"
					render={({ field }) => (
						<FormItem className="flex-grow basis-[170px] space-y-0">
							<FormLabel className="sr-only">NIK</FormLabel>
							<FormControl>
								<Input
									{...field}
									ref={mergeRefs(field.ref, autoFocusRef)}
									type="number"
									pattern="[0-9]*"
									inputMode="numeric"
									autoFocus
									autoComplete="off"
									placeholder="NIK"
									onChange={(event) =>
										event.target.value.length <= NATIONALITY_ID_LENGTH
											? field.onChange(event)
											: toast.info(
													`NIK terlalu panjang. Harap masukkan NIK yang valid dengan ${NATIONALITY_ID_LENGTH} digit.`,
												)
									}
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
					Tambahkan Pelanggan
				</Button>
			</form>
		</Form>
	)
}
