import AddCustomerDrawer from '@/components/customer/add-customer-drawer'
import UserAuthenticationDrawer from '@/components/user/user-authentication-drawer'

export default function HomePage() {
	return (
		<main className="mx-auto flex h-dvh max-w-xl flex-col">
			<section className="flex flex-col gap-6 p-4">
				<UserAuthenticationDrawer />
				<section className="grid grid-cols-3 place-items-center gap-4">
					<AddCustomerDrawer />
				</section>
			</section>
		</main>
	)
}
