<template>
  <div class="py-8">
    <div class="container mx-auto">
      <UiBreadcrumb v-if="product" class="mb-6">
        <UiBreadcrumbList>
          <UiBreadcrumbItem>
            <UiBreadcrumbLink href="/"> Главная </UiBreadcrumbLink>
          </UiBreadcrumbItem>
          <UiBreadcrumbSeparator />
          <UiBreadcrumbItem>
            <UiBreadcrumbLink href="/catalog"> Каталог </UiBreadcrumbLink>
          </UiBreadcrumbItem>
          <UiBreadcrumbSeparator />
          <UiBreadcrumbItem>
            <UiBreadcrumbPage>{{ product.name }}</UiBreadcrumbPage>
          </UiBreadcrumbItem>
        </UiBreadcrumbList>
      </UiBreadcrumb>

      <div v-if="isLoading" class="animate-pulse">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div class="bg-gray-200 h-96 rounded-lg"></div>
          <div>
            <div class="bg-gray-200 h-8 rounded mb-4"></div>
            <div class="bg-gray-200 h-6 rounded mb-2"></div>
            <div class="bg-gray-200 h-6 rounded w-3/4 mb-4"></div>
            <div class="bg-gray-200 h-10 rounded w-32"></div>
          </div>
        </div>
      </div>

      <div v-else-if="product" class="space-y-12">
        <!-- Product Main Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-18">
          <!-- Image Carousel -->
          <div>
            <ProductCarousel :images="product.images" :alt="product.name" />
          </div>

          <!-- Product Info -->
          <div>
            <h1 class="text-3xl font-bold text-vine-800 mb-4">{{ product.name }}</h1>

            <div class="mb-6">
              <div class="flex items-center gap-4 mb-2">
                <span v-if="product.seedlingPrice" class="text-2xl font-bold text-vine-700">{{
                  formatPrice(product.seedlingPrice)
                }}</span>
                <span v-if="!product.inStock" class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                  Нет в наличии
                </span>
                <span v-else class="px-3 py-1 bg-vine-100 text-vine-800 rounded-full text-sm"> В наличии </span>
              </div>
            </div>

            <!-- Characteristics -->
            <div class="space-y-4 mb-8">
              <h3 class="text-lg font-semibold text-vine-800">Характеристики</h3>
              <div class="grid grid-cols-2 gap-4">
                <div v-if="product.berryShape">
                  <span class="text-sm text-vine-600">Форма ягоды:</span>
                  <p class="font-medium">{{ product.berryShape }}</p>
                </div>
                <div v-if="product.color">
                  <span class="text-sm text-vine-600">Цвет:</span>
                  <p class="font-medium">{{ product.color }}</p>
                </div>
                <div v-if="product.taste">
                  <span class="text-sm text-vine-600">Вкус:</span>
                  <p class="font-medium">{{ product.taste }}</p>
                </div>
                <!--                <div v-if="product.collection">-->
                <!--                  <span class="text-sm text-vine-600">Коллекция:</span>-->
                <!--                  <p class="font-medium">{{ product.collection.name }}</p>-->
                <!--                </div>-->
              </div>
            </div>

            <!-- Add to Cart -->
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <div class="flex items-center border border-vine-300 rounded-lg">
                  <UiButton @click="decrementQuantity" variant="ghost" size="sm" :disabled="quantity <= 1">
                    -
                  </UiButton>
                  <span class="px-4 py-2 min-w-16 text-center">{{ quantity }}</span>
                  <UiButton @click="incrementQuantity" variant="ghost" size="sm" :disabled="quantity >= 10">
                    +
                  </UiButton>
                </div>
                <UiButton
                  @click="addToCart"
                  :disabled="!product.inStock || adding"
                  class="bg-vine-600 hover:bg-vine-700 text-accent px-8"
                >
                  {{ adding ? 'Добавление...' : 'В корзину' }}
                </UiButton>
              </div>
              <p class="text-sm text-vine-600">
                {{ product.inStock ? 'Товар в наличии' : 'Товар временно отсутствует' }}
              </p>
            </div>
          </div>
          <!-- Description -->
        </div>
        <div v-if="product.description" class="mt-8 cascade">
          <h3 class="text-lg font-semibold text-vine-800 mb-4">Описание</h3>
          <div class="prose prose-vine max-w-none" v-html="product.description"></div>
        </div>

        <!-- Recommendations -->
        <section v-if="recommendations.data.length > 0">
          <h2 class="text-2xl font-bold text-vine-800 mb-6">Похожие товары</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard v-for="item in recommendations.data" :key="item.id" v-bind="item" />
          </div>
        </section>
      </div>

      <!-- Error State -->
      <div v-else class="text-center py-12">
        <div class="mb-4">
          <Icon name="i-lucide-grape" class="w-16 h-16 mx-auto text-vine-300" />
        </div>
        <h1 class="text-2xl font-bold text-vine-800 mb-2">Товар не найден</h1>
        <p class="text-vine-600 mb-4">Возможно, товар был удален или перемещен</p>
        <NuxtLink to="/catalog">
          <UiButton>Вернуться в каталог</UiButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import type { Product } from '@/types'

const route = useRoute()
const cartStore = useCartStore()
const id = route.params.id
const { product: productService } = useServices()

// const recommendations = ref([])
const quantity = ref(1)
const adding = ref(false)

const {
  data: product,
  refresh,
  status
} = await useLazyAsyncData<Product.Model>(() => {
  return productService.getProductById(id as string)
})

const { data: recommendations, status: recommendationsStatus } = await useLazyAsyncData(
  () => productService.getProducts({ pageSize: '4' }),
  {
    default: () => ({
      data: [],
      meta: {}
    })
  }
)

const isLoading = computed<boolean>(() => {
  return ['idle', 'pending'].includes(unref(status))
})

// async function fetchRecommendations() {
//   try {
//     const response = await $api('/products', {
//       params: {
//         limit: 4,
//         collection: product.value.collection?.id,
//         exclude: product.value.id
//       }
//     })
//     recommendations.value = response.data || []
//   } catch (error) {
//     console.error('Error fetching recommendations:', error)
//   }
// }

function incrementQuantity() {
  if (quantity.value < 10) {
    quantity.value++
  }
}

function decrementQuantity() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

async function addToCart() {
  if (!product.value || adding.value) return

  adding.value = true
  try {
    await cartStore.addItem(product.value.id, quantity.value)
    // Show success notification
    // You can add a toast notification here
  } catch (error) {
    console.error('Error adding to cart:', error)
    // Show error notification
  } finally {
    adding.value = false
  }
}

function formatPrice(price: string | number): string {
  const priceNumber = typeof price === 'string' ? Number(price) : price
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB'
  }).format(priceNumber)
}

// SEO
useHead(() => ({
  title: product.value ? `${product.value.name} - Саженцы винограда` : 'Товар не найден',
  meta: [
    {
      name: 'description',
      content: product.value
        ? `${product.value.name}. ${product.value.description || 'Качественные саженцы винограда.'}`
        : 'Товар не найден'
    }
  ]
}))
</script>
