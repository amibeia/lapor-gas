import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type LayoutState = {
	isDelayed: boolean
}

type LayoutActions = {
	actions: {
		setIsDelayed: (value: boolean) => void
	}
}

const initialState: LayoutState = {
	isDelayed: false,
}

const layoutStore = create<LayoutState & LayoutActions>()(
	persist(
		(set) => ({
			...initialState,
			actions: {
				setIsDelayed: (value) => set({ isDelayed: value }),
			},
		}),
		{
			name: 'layout-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				isDelayed: state.isDelayed,
			}),
		},
	),
)

export const useIsDelayed = () => layoutStore((state) => state.isDelayed)
export const useLayoutActions = () => layoutStore((state) => state.actions)
