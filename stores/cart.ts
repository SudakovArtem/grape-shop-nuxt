import type { Cart, Product } from '@/types'

const CART_INITIAL_STATE = {
  items: [],
  totalCartPrice: 0,
  totalItems: 0
} as const satisfies Cart.Model

export const useCartStore = defineStore('cart', () => {
  const state = reactive<Cart.Model>(CART_INITIAL_STATE)

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

  const totalItems = computed<number>(() => {
    return state.items.reduce((acc, item) => acc + item.quantity, 0)
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

  const clear = () => {
    setCart(CART_INITIAL_STATE)
  }

  const changeItemQuantity = (id: number, quantity: number) => {
    const index = state.items.findIndex((item) => item.id === id)
    if (index !== -1) {
      state.items[index].quantity = quantity
    }
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
    setCartItemQuantity,
    clear,
    changeItemQuantity
  }
})
