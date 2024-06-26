import UserAuthenticationDrawer from '@/components/user/user-authentication-drawer'

export default function HomePage() {
	return (
		<main className="mx-auto flex h-dvh max-w-xl flex-col">
			<section className="flex flex-col p-4">
				<UserAuthenticationDrawer />
			</section>
		</main>
	)
}
