<script setup lang="ts">
import type { Cart } from '@/types'
import { debounce } from 'lodash'
import formatPrice from '@/core/utils/formatPrice'

type Props = {
  productId: number
  type: Cart.Item['type']
  price?: string
  itemsInStock?: number
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  price: '0',
  itemsInStock: 0,
  loading: false
})

const cartStore = useCartStore()
const { getCartItemByProductId, setCartItemQuantity, setCart, changeItemQuantity } = cartStore
const { cart: cartService } = useServices()

const itemInCart = computed<Cart.Item | undefined>(() => {
  return getCartItemByProductId(props.productId, props.type)
})

const isInCart = computed<boolean>(() => !!unref(itemInCart))

const isSending = ref<boolean>(false)
const itemCount = ref<number>(unref(itemInCart)?.quantity ?? 0)

const badge = computed<{ text: string; variant: 'destructive' | 'outline' }>(() => {
  if (!props.itemsInStock) {
    return {
      text: 'Нет в наличии',
      variant: 'destructive'
    }
  }

  if (props.itemsInStock < 10) {
    return {
      text: 'Осталось мало',
      variant: 'outline'
    }
  }

  return {
    text: 'В наличии',
    variant: 'outline'
  }
})

const addToCart = async () => {
  isSending.value = true
  try {
    await cartService.addItem({
      productId: props.productId,
      type: props.type,
      quantity: 1
    })
    itemCount.value = 1
  } finally {
    isSending.value = false
  }
}

const increaseQuantity = async (quantity: number) => {
  if (!itemInCart.value) return

  isSending.value = true
  try {
    const response = await cartService.updateItemQuantity(itemInCart.value.id, { quantity })
    changeItemQuantity(itemInCart.value.id, quantity)
    if (response.id && response.quantity > 0) {
      setCartItemQuantity(response.id, response.quantity)
      itemCount.value = response.quantity
    }
  } finally {
    isSending.value = false
  }
}

const deleteCartItem = async () => {
  if (!itemInCart.value?.id) return

  isSending.value = true
  try {
    const response = await cartService.removeItem(itemInCart.value.id)
    setCart(response)
  } finally {
    isSending.value = false
  }
}

const updateQuantity = debounce((value: number) => {
  if (value <= 0) {
    deleteCartItem()
    return
  }
  increaseQuantity(value)
}, 300)

watch(itemCount, (newValue) => {
  if (isSending.value) {
    return
  }

  updateQuantity(newValue)
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <UiBadge :variant="badge.variant"> {{ badge.text }} </UiBadge>

    <div class="flex items-center justify-between w-full">
      <div>
        <span class="text-lg font-bold text-vine-700">
          {{ formatPrice(price) }}
        </span>
      </div>

      <div class="w-30 shrink-0">
        <UiNumberField
          v-model="itemCount"
          :min="0"
          :max="itemsInStock"
          v-if="isInCart"
          class="w-full"
          :disabled="loading || isSending"
        >
          <UiNumberFieldContent>
            <UiNumberFieldDecrement />
            <UiNumberFieldInput />
            <UiNumberFieldIncrement />
          </UiNumberFieldContent>
        </UiNumberField>
        <UiButton
          v-else
          @click="addToCart"
          size="sm"
          :disabled="!itemsInStock"
          :loading="loading || isSending"
          class="bg-vine-600 hover:bg-vine-700 w-full"
        >
          В корзину
        </UiButton>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
