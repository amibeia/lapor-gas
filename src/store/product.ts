import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { Product } from '@/lib/types'

type ProductState = {
	product: Product | null
}

type ProductActions = {
	actions: {
		setProduct: (product: Product | null) => void
	}
}

const initialState: ProductState = {
	product: null,
}

const productStore = create<ProductState & ProductActions>()(
	persist(
		(set) => ({
			...initialState,
			actions: {
				setProduct: (product) => set({ product }),
			},
		}),
		{
			name: 'product-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({ product: state.product }),
		},
	),
)

export const useProduct = () => productStore((state) => state.product)
export const useProductActions = () => productStore((state) => state.actions)
