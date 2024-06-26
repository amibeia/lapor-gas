import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { Customer } from '@/lib/types'

type CustomerState = {
	nationalityIds: Customer['nationalityId'][]
}

type CustomerActions = {
	actions: {
		addNationalityId: (nationalityId: Customer['nationalityId']) => void
	}
}

const initialState: CustomerState = {
	nationalityIds: [],
}

const customerStore = create<CustomerState & CustomerActions>()(
	persist(
		(set) => ({
			...initialState,
			actions: {
				addNationalityId: (nationalityId) =>
					set((state) => ({
						nationalityIds: [...state.nationalityIds, nationalityId],
					})),
			},
		}),
		{
			name: 'customer-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				nationalityIds: state.nationalityIds,
			}),
		},
	),
)

export const useCustomerNationalityIds = () =>
	customerStore((state) => state.nationalityIds)
export const useCustomerActions = () => customerStore((state) => state.actions)
