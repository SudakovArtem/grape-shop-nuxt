import type { Product } from '@/types'

export namespace Cart {
  export interface Model {
    items: Item[]
  }

  export interface AddItemDto {
    productId: number
    type: 'cutting' | 'seedling'
    quantity?: number
  }

  export interface UpdateQuantityDto {
    quantity: number
  }

  export interface Item {
    id: number
    userId: number
    productId: number
    type: 'cutting' | 'seedling'
    quantity: number
  }

  export interface Response {
    items: Item[]
    totalCartPrice: number
  }
}
