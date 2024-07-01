import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { DEFAULT_ORDER_QUANTITY, ORDER_PREFIX_ID } from '@/lib/constants'
import { Order } from '@/lib/types'
import { nanoId } from '@/lib/utils'

type OrderState = {
	orders: Order[]
}

type OrderActions = {
	actions: {
		toggleOrder: (nationalityId: Order['nationalityId']) => void

		increaseOrderQuantity: (id: Order['id']) => void
		decreaseOrderQuantity: (id: Order['id']) => void
	}
}

const initialState: OrderState = {
	orders: [],
}

const orderStore = create<OrderState & OrderActions>()(
	persist(
		(set) => ({
			...initialState,
			actions: {
				toggleOrder: (nationalityId) =>
					set((state) => ({
						orders: state.orders.find(
							(order) => order.nationalityId === nationalityId,
						)
							? state.orders.filter(
									(order) => order.nationalityId !== nationalityId,
								)
							: [
									...state.orders,
									{
										id: nanoId({ prefix: ORDER_PREFIX_ID }),
										nationalityId,
										quantity: DEFAULT_ORDER_QUANTITY,
									},
								],
					})),
				increaseOrderQuantity: (id) =>
					set((state) => ({
						orders: state.orders.map((order) => {
							return order.id === id
								? { ...order, quantity: order.quantity + 1 }
								: order
						}),
					})),
				decreaseOrderQuantity: (id) =>
					set((state) => ({
						orders: state.orders.map((order) => {
							return order.id === id && order.quantity > 1
								? { ...order, quantity: order.quantity - 1 }
								: order
						}),
					})),
			},
		}),
		{
			name: 'order-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({ orders: state.orders }),
		},
	),
)

export const useOrders = () => orderStore((state) => state.orders)
export const useOrderActions = () => orderStore((state) => state.actions)
