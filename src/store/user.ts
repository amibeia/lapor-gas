import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { UserAuth, UserCredential, UserProfile } from '@/lib/types'

type UserState = {
	credential: UserCredential | null
	auth: UserAuth | null
	profile: UserProfile | null
}

type UserActions = {
	actions: {
		setCredential: (credential: UserCredential) => void
		setAuth: (auth: UserAuth | null) => void
		setProfile: (profile: UserProfile | null) => void
	}
}

const initialState: UserState = {
	credential: null,
	auth: null,
	profile: null,
}

const userStore = create<UserState & UserActions>()(
	persist(
		(set) => ({
			...initialState,
			actions: {
				setCredential: (credential) => set({ credential }),
				setAuth: (auth) => set({ auth }),
				setProfile: (profile) => set({ profile }),
			},
		}),
		{
			name: 'user-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				credential: state.credential,
				auth: state.auth,
				profile: state.profile,
			}),
		},
	),
)

export const useCredential = () => userStore((state) => state.credential)
export const useAuth = () => userStore((state) => state.auth)
export const useProfile = () => userStore((state) => state.profile)
export const useUserActions = () => userStore((state) => state.actions)
