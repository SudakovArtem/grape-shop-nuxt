import type { Cart, Product } from '@/types'

export const useCartStore = defineStore('cart', () => {
  const state = reactive<Cart.Model>({
    items: []
  })

  // Computed values
  const items = computed<Cart.Item[]>(() => state.items)

  const totalItems = computed(() => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  })

  const subtotal = computed(() => {
    return state.items.reduce((total, item) => {
      return total + Number(item.product.seedlingPrice) * item.quantity
    }, 0)
  })

  const total = computed(() => subtotal.value)

  // Load cart from localStorage on client-side
  function loadCart() {
    if (process.client) {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        try {
          state.items = JSON.parse(savedCart)
        } catch (error) {
          console.error('Error loading cart from localStorage:', error)
          state.items = []
        }
      }
    }
  }

  // Save cart to localStorage
  function saveCart() {
    if (process.client) {
      localStorage.setItem('cart', JSON.stringify(state.items))
    }
  }

  // Add item to cart
  async function addItem(productId: number, quantity: number = 1) {
    try {
      // Fetch product details
      const product = await $fetch<Product.Model>(`/products/${productId}`)

      // Check if item already exists in cart
      const existingItem = state.items.find((item) => item.productId === productId)

      if (existingItem) {
        // Update quantity
        existingItem.quantity = Math.min(existingItem.quantity + quantity, 10)
      } else {
        // Add new item
        const newItem: Cart.Item = {
          id: Date.now(), // Simple ID generation
          product,
          quantity: Math.min(quantity, 10)
        }
        state.items.push(newItem)
      }

      saveCart()
    } catch (error) {
      console.error('Error adding item to cart:', error)
      throw error
    }
  }

  // Update item quantity
  async function updateQuantity(itemId: number, quantity: number) {
    const item = state.items.find((item) => item.id === itemId)
    if (item) {
      item.quantity = Math.max(1, Math.min(quantity, 10))
      saveCart()
    }
  }

  // Remove item from cart
  async function removeItem(itemId: number) {
    const index = state.items.findIndex((item) => item.id === itemId)
    if (index > -1) {
      state.items.splice(index, 1)
      saveCart()
    }
  }

  // Clear cart
  async function clear() {
    state.items = []
    saveCart()
  }

  // Get item by product ID
  function getItemByProductId(productId: number): Cart.Item | undefined {
    return state.items.find((item) => item.productId === productId)
  }

  return {
    state,
    items,
    totalItems,
    subtotal,
    total,
    loadCart,
    addItem,
    updateQuantity,
    removeItem,
    clear,
    getItemByProductId
  }
})
