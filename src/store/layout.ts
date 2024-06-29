import { create } from 'zustand'

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

const layoutStore = create<LayoutState & LayoutActions>()((set) => ({
	...initialState,
	actions: {
		setIsDelayed: (value) => set({ isDelayed: value }),
	},
}))

export const useIsDelayed = () => layoutStore((state) => state.isDelayed)
export const useLayoutActions = () => layoutStore((state) => state.actions)
