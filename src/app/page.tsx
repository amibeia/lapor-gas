import AddCustomerDrawer from '@/components/customer/add-customer-drawer'
import VerifyCustomersDrawer from '@/components/customer/verify-customers-drawer'
import AddOrderDrawer from '@/components/order/add-order-drawer'
import UserAuthenticationDrawer from '@/components/user/user-authentication-drawer'

export default function HomePage() {
	return (
		<main className="mx-auto flex h-dvh max-w-xl flex-col">
			<section className="flex flex-col gap-6 p-4">
				<UserAuthenticationDrawer />
				<section className="grid grid-cols-auto-fill-100 place-items-center gap-4">
					<AddCustomerDrawer />
					<VerifyCustomersDrawer />
					<AddOrderDrawer />
				</section>
			</section>
		</main>
	)
}
