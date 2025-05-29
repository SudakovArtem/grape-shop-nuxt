import type { Cart, Product } from '@/types'

export const useCartStore = defineStore('cart', () => {
  const state = reactive<Cart.Model>({
    items: [],
    totalCartPrice: 0,
    totalItems: 0
  })

  // Computed values
  const items = computed<Cart.Item[]>(() => state.items)

  const cuttingsIds = computed<number[]>(() => {
    return state.items.filter((item) => item.type === 'cutting').map((item) => item.productId)
  })

  const seedlingsIds = computed<number[]>(() => {
    return state.items.filter((item) => item.type === 'seedling').map((item) => item.productId)
  })

  const itemsIds = computed<number[]>(() => {
    return [...cuttingsIds.value, ...seedlingsIds.value]
  })

  const totalItems = computed(() => {
    return state.totalItems
  })

  const subtotal = computed(() => {
    return state.totalCartPrice
  })

  const total = computed(() => subtotal.value)

  const getCartItemByProductId = (productId: number, type: Cart.Item['type']): Cart.Item | undefined => {
    return state.items.find((item) => item.productId === productId && item.type === type)
  }

  const setCartItemQuantity = (id: number, quantity: number) => {
    const item = state.items.find((item) => item.id === id)
    if (item) {
      item.quantity = quantity
    }
  }

  const setCart = (cart: Cart.Model | null) => {
    state.items = cart?.items ?? []
    state.totalCartPrice = cart?.totalCartPrice ?? 0
    state.totalItems = cart?.totalItems ?? 0
  }

  const setCartItems = (items: Cart.Item[]) => {
    state.items = items
  }

  return {
    state,
    items,
    cuttingsIds,
    seedlingsIds,
    itemsIds,
    totalItems,
    subtotal,
    total,
    getCartItemByProductId,
    setCart,
    setCartItems,
    setCartItemQuantity
  }
})
