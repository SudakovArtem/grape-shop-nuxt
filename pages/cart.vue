<template>
  <div class="py-8">
    <div class="container mx-auto">
      <UiBreadcrumb class="mb-6">
        <UiBreadcrumbList>
          <UiBreadcrumbItem>
            <UiBreadcrumbLink href="/"> Главная </UiBreadcrumbLink>
          </UiBreadcrumbItem>
          <UiBreadcrumbSeparator />
          <UiBreadcrumbItem>
            <UiBreadcrumbLink href="/cart"> Корзина </UiBreadcrumbLink>
          </UiBreadcrumbItem>
        </UiBreadcrumbList>
      </UiBreadcrumb>

      <div class="mb-8">
        <h1 class="text-3xl font-bold text-vine-800 mb-4">Корзина</h1>
      </div>

      <div v-if="!items?.length" class="text-center py-12">
        <div class="mb-4">
          <Icon name="i-lucide-grape" class="w-16 h-16 mx-auto text-vine-300" />
        </div>
        <h2 class="text-xl font-medium text-vine-800 mb-2">Корзина пуста</h2>
        <p class="text-vine-600 mb-4">Добавьте товары из каталога</p>
        <NuxtLink to="/catalog">
          <UiButton>Перейти в каталог</UiButton>
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <CartItem v-for="item in items" :key="item.id" :item="item" />
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <UiCard class="p-6 sticky top-4">
            <h2 class="text-xl font-semibold text-vine-800 mb-4">Итого</h2>

            <div class="space-y-2 mb-4">
              <div class="flex justify-between">
                <span class="text-vine-600">Товары ({{ totalItems }})</span>
                <span>{{ formatPrice(subtotal) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-vine-600">Доставка</span>
                <span>{{ deliveryPrice > 0 ? formatPrice(deliveryPrice) : 'Бесплатно' }}</span>
              </div>
            </div>

            <div class="border-t border-vine-200 pt-4 mb-6">
              <div class="flex justify-between text-lg font-semibold">
                <span>Итого:</span>
                <span>{{ formatPrice(subtotal + deliveryPrice) }}</span>
              </div>
            </div>

            <!-- Delivery Options -->
            <div class="mb-6">
              <h3 class="font-medium text-vine-800 mb-3">Способ доставки</h3>
              <div class="space-y-2">
                <label class="flex items-center gap-2">
                  <input type="radio" v-model="deliveryMethod" value="pickup" class="text-vine-600" />
                  <span class="text-sm">Самовывоз (бесплатно)</span>
                </label>
                <label class="flex items-center gap-2">
                  <input type="radio" v-model="deliveryMethod" value="delivery" class="text-vine-600" />
                  <span class="text-sm">Доставка ({{ formatPrice(500) }})</span>
                </label>
              </div>
            </div>

            <UiButton
              @click="proceedToCheckout"
              class="w-full bg-vine-600 hover:bg-vine-700 text-accent"
              :disabled="processing"
            >
              {{ processing ? 'Обработка...' : 'Оформить заказ' }}
            </UiButton>

            <p class="text-xs text-vine-500 mt-3 text-center">Нажимая "Оформить заказ", вы соглашаетесь с условиями</p>
          </UiCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useAuthStore from '@/stores/auth'

const cartStore = useCartStore()
const authStore = useAuthStore()
const { items, subtotal, totalItems } = storeToRefs(cartStore)
const { clear: clearCart } = cartStore
const { openModal } = authStore
const { isAuth } = storeToRefs(authStore)
const { cart: cartService, order: orderService } = useServices()

const deliveryMethod = ref('pickup')
const processing = ref(false)

const deliveryPrice = computed(() => {
  return deliveryMethod.value === 'delivery' ? 500 : 0
})

await useLazyAsyncData(() => cartService.getCart(), {
  default: () => ({ items: [], totalItems: 0, totalCartPrice: 0 })
})

async function proceedToCheckout() {
  if (!isAuth.value) {
    openModal('login')
    return
  }

  processing.value = true
  try {
    const response = await orderService.createOrder()

    // Clear cart after successful order
    clearCart()

    // Redirect to success page or show success message
    await navigateTo('/profile')
  } catch (error) {
    console.error('Error creating order:', error)
  } finally {
    processing.value = false
  }
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB'
  }).format(price)
}

// SEO
useHead({
  title: 'Корзина - Саженцы винограда',
  meta: [
    {
      name: 'description',
      content: 'Корзина покупок - оформление заказа на саженцы винограда.'
    }
  ]
})
</script>
