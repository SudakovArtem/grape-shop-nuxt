import type { nuxtContext } from '@nuxt/types'
import type { Request, Response, Cart, CartService as ICartService } from '@/types'

export default (context: nuxtContext) => {
  const cartStore = useCartStore()
  class CartService implements ICartService {
    private static CART_METHODS = context.$api.cart

    async addItem(body: Cart.AddItemDto): Promise<Cart.Model> {
      const response = await CartService.CART_METHODS.addItem(body)
      cartStore.setCart(response)
      return response
    }

    async getCart(): Promise<Cart.Model> {
      const response = await CartService.CART_METHODS.getCart()
      cartStore.setCart(response)
      return response
    }

    async updateItemQuantity(itemId: number, body: Cart.UpdateQuantityDto): Promise<Cart.Item> {
      const response = await CartService.CART_METHODS.updateItemQuantity(itemId, body)
      return response
    }

    async removeItem(itemId: number): Promise<Cart.Model> {
      const response = await CartService.CART_METHODS.removeItem(itemId)
      cartStore.setCart(response)
      return response
    }
  }

  context.$services.cart = new CartService()
}
