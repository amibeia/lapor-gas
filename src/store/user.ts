import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { UserAuth, UserCredential } from '@/lib/types'

type UserState = {
	credential: UserCredential | null
	auth: UserAuth | null
}

type UserActions = {
	actions: {
		setCredential: (credential: UserCredential) => void
		setAuth: (auth: UserAuth | null) => void
	}
}

const initialState: UserState = {
	credential: null,
	auth: null,
}

const userStore = create<UserState & UserActions>()(
	persist(
		(set) => ({
			...initialState,
			actions: {
				setCredential: (credential) => set({ credential }),
				setAuth: (auth) => set({ auth }),
			},
		}),
		{
			name: 'user-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				credential: state.credential,
				auth: state.auth,
			}),
		},
	),
)

export const useUserCredential = () => userStore((state) => state.credential)
export const useUserAuth = () => userStore((state) => state.auth)
export const useUserActions = () => userStore((state) => state.actions)
