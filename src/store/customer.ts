import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { Customer } from '@/lib/types'

type CustomerState = {
	nationalityIds: Customer['nationalityId'][]
	selectedNationalityIds: Customer['nationalityId'][]
}

type CustomerActions = {
	actions: {
		addNationalityId: (nationalityId: Customer['nationalityId']) => void
		toggleNationalityId: (nationalityId: Customer['nationalityId']) => void
		toggleAllSelectedNationalityIds: () => void
	}
}

const initialState: CustomerState = {
	nationalityIds: [],
	selectedNationalityIds: [],
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
				toggleNationalityId: (nationalityId) =>
					set((state) => ({
						selectedNationalityIds: state.selectedNationalityIds.find(
							(selectedNationalityId) =>
								selectedNationalityId === nationalityId,
						)
							? state.selectedNationalityIds.filter(
									(selectedNationalityId) =>
										selectedNationalityId !== nationalityId,
								)
							: [...state.selectedNationalityIds, nationalityId],
					})),
				toggleAllSelectedNationalityIds: () =>
					set((state) => ({
						selectedNationalityIds:
							state.selectedNationalityIds.length ===
							state.nationalityIds.length
								? []
								: [...state.nationalityIds],
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

export const useNationalityIds = () =>
	customerStore((state) => state.nationalityIds)
export const useSelectedNationalityIds = () =>
	customerStore((state) => state.selectedNationalityIds)
export const useCustomerActions = () => customerStore((state) => state.actions)
