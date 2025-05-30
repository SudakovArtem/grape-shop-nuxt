<template>
  <UiCard class="p-4">
    <div class="flex gap-4">
      <!-- Product Image -->
      <div class="w-20 h-20 flex-shrink-0">
        <NuxtLink :to="`/catalog/${item.productId}`">
          <NuxtImg
            v-if="item.imageUrl"
            :src="item.imageUrl"
            :alt="item.productName"
            class="w-full h-full object-cover rounded-md"
            loading="lazy"
          />
          <div v-else class="w-full h-full bg-vine-100 rounded-md flex items-center justify-center">
            <Icon name="i-lucide-grape" class="w-8 h-8 text-vine-300" />
          </div>
        </NuxtLink>
      </div>

      <!-- Product Info -->
      <div class="flex-1 min-w-0">
        <div class="flex justify-between items-start mb-2">
          <div class="flex-1 min-w-0">
            <h3 class="font-medium text-vine-800 truncate">
              <NuxtLink :to="`/catalog/${item.productId}`" class="hover:text-vine-600 transition-colors">
                <span v-text="`${item.productName} - ${item.type === 'seedling' ? 'Саженец' : 'Черенок'}`" />
              </NuxtLink>
            </h3>

            <!-- Product characteristics -->
            <div class="flex items-center gap-3 mt-1 text-xs text-vine-600">
              <span v-if="item.color" class="flex items-center gap-1">
                <span :class="getColorClass(item.color)" class="w-2 h-2 rounded-full"></span>
                {{ item.color }}
              </span>
              <span v-if="item.berryShape">{{ item.berryShape }}</span>
            </div>
          </div>

          <!-- Remove Button -->
          <UiButton
            @click="deleteCartItem"
            variant="outline"
            size="icon"
            class="text-red-600 hover:text-red-700 hover:bg-red-50 ml-2"
          >
            <Icon name="i-lucide-trash-2" class="size-4" />
          </UiButton>
        </div>

        <!-- Price and Quantity -->
        <div class="flex items-center justify-between">
          <!-- Quantity Controls -->
          <div class="w-30 shrink-0">
            <UiNumberField v-model="itemCount" :min="1" :max="10" v-if="isInCart" class="w-full" :disabled="isSending">
              <UiNumberFieldContent>
                <UiNumberFieldDecrement />
                <UiNumberFieldInput />
                <UiNumberFieldIncrement />
              </UiNumberFieldContent>
            </UiNumberField>
          </div>

          <!-- Price -->
          <div class="text-right">
            <div class="text-sm text-vine-600">{{ formatPrice(item.unitPrice) }} × {{ item.quantity }}</div>
            <div class="font-semibold text-vine-800">
              {{ formatPrice(item.itemTotalPrice) }}
            </div>
          </div>
        </div>

        <!-- Stock Status -->
        <div v-if="!item.cuttingInStock" class="mt-2">
          <span class="text-xs text-red-600 bg-red-50 px-2 py-1 rounded"> Товар временно отсутствует </span>
        </div>
      </div>
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import type { Cart } from '@/types'
import { debounce } from 'lodash'
import formatPrice from '@/core/utils/formatPrice'

const props = defineProps<{
  item: Cart.Item
}>()

const emit = defineEmits<{
  'update-quantity': [id: number, quantity: number]
  remove: [id: number]
}>()

const cartStore = useCartStore()
const { getCartItemByProductId, setCartItemQuantity, setCart, changeItemQuantity } = cartStore
const { cart: cartService } = useServices()

const itemInCart = computed<Cart.Item | undefined>(() => {
  return getCartItemByProductId(props.item.productId, props.item.type)
})

const isInCart = computed<boolean>(() => !!unref(itemInCart))
const itemCount = ref<number>(unref(itemInCart)?.quantity ?? 0)
const isSending = ref<boolean>(false)

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

function getColorClass(color: string): string {
  const colorMap: Record<string, string> = {
    Красный: 'bg-red-500',
    Белый: 'bg-background border',
    Розовый: 'bg-pink-300',
    Синий: 'bg-blue-600',
    Черный: 'bg-gray-900',
    Зеленый: 'bg-green-500'
  }
  return colorMap[color] || 'bg-gray-300'
}
</script>
