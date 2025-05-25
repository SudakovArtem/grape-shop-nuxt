import type { Product } from '@/types'

export namespace Cart {
  export interface Model {
    items: Item[]
  }

  export interface Item {
    id: number
    product: Product.Model
    quantity: number
  }
}
