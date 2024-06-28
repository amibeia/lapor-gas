import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { Customer } from '@/lib/types'

type CustomerState = {
	nationalityIds: Customer['nationalityId'][]
	selectedNationalityIds: Customer['nationalityId'][]
	customers: Customer[]
	proceedNationalityId: Customer['nationalityId'] | null
}

type CustomerActions = {
	actions: {
		addNationalityId: (nationalityId: Customer['nationalityId']) => void
		toggleNationalityId: (nationalityId: Customer['nationalityId']) => void
		toggleAllSelectedNationalityIds: (
			nationalityIds: Customer['nationalityId'][],
		) => void
		addCustomer: (customer: Customer) => void
		setProceedNationalityId: (
			nationalityId: Customer['nationalityId'] | null,
		) => void
	}
}

const initialState: CustomerState = {
	nationalityIds: [],
	selectedNationalityIds: [],
	customers: [],
	proceedNationalityId: null,
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
				toggleAllSelectedNationalityIds: (nationalityIds) =>
					set((state) => ({
						selectedNationalityIds:
							state.selectedNationalityIds.length === nationalityIds.length
								? []
								: [...nationalityIds],
					})),
				addCustomer: (customer) =>
					set((state) => ({ customers: [...state.customers, customer] })),
				setProceedNationalityId: (nationalityId) =>
					set({ proceedNationalityId: nationalityId }),
			},
		}),
		{
			name: 'customer-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				nationalityIds: state.nationalityIds,
				selectedNationalityIds: state.selectedNationalityIds,
				customers: state.customers,
			}),
		},
	),
)

export const useNationalityIds = () =>
	customerStore((state) => state.nationalityIds)
export const useSelectedNationalityIds = () =>
	customerStore((state) => state.selectedNationalityIds)
export const useProceedNationalityId = () =>
	customerStore((state) => state.proceedNationalityId)
export const useCustomerActions = () => customerStore((state) => state.actions)
