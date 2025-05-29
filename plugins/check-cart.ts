import type { nuxtContext } from '@nuxt/types'

// @ts-expect-error nuxtContext
export default defineNuxtPlugin(async (context: nuxtContext) => {
  const {
    $services: { cart: cartService }
  } = context

  try {
    await cartService.getCart()
  } catch (error) {
    console.error('Cart check failed:', error)
  }
})
