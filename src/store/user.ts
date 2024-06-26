import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { UserCredential } from '@/lib/types'

type UserState = {
	credential: UserCredential | null
}

type UserActions = {
	actions: {
		setCredential: (credential: UserCredential) => void
	}
}

const initialState: UserState = {
	credential: null,
}

const userStore = create<UserState & UserActions>()(
	persist(
		(set) => ({
			...initialState,
			actions: { setCredential: (credential) => set({ credential }) },
		}),
		{
			name: 'user-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				credential: state.credential,
			}),
		},
	),
)

export const useUserCredential = () => userStore((state) => state.credential)
export const useUserActions = () => userStore((state) => state.actions)
