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
                {{ item.productName }}
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
            @click="$emit('remove', item.id)"
            variant="ghost"
            size="sm"
            class="text-red-600 hover:text-red-700 hover:bg-red-50 ml-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
          </UiButton>
        </div>

        <!-- Price and Quantity -->
        <div class="flex items-center justify-between">
          <!-- Quantity Controls -->
          <div class="flex items-center gap-2">
            <UiButton
              @click="decrementQuantity"
              variant="outline"
              size="sm"
              :disabled="item.quantity <= 1"
              class="w-8 h-8 p-0"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
              </svg>
            </UiButton>

            <span class="text-sm font-medium min-w-8 text-center">{{ item.quantity }}</span>

            <UiButton
              @click="incrementQuantity"
              variant="outline"
              size="sm"
              :disabled="item.quantity >= 10"
              class="w-8 h-8 p-0"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </UiButton>
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
        <div v-if="!item.inStock" class="mt-2">
          <span class="text-xs text-red-600 bg-red-50 px-2 py-1 rounded"> Товар временно отсутствует </span>
        </div>
      </div>
    </div>
  </UiCard>
</template>

<script setup lang="ts">
interface CartItem {
  id: number
  userId: number
  productId: number
  type: string | null
  quantity: number
  productName: string
  berryShape: string | null
  color: string | null
  taste: string | null
  variety: string | null
  imageUrl: string | null
  inStock: boolean | null
  unitPrice: number
  itemTotalPrice: number
}

const props = defineProps<{
  item: CartItem
}>()

const emit = defineEmits<{
  'update-quantity': [id: number, quantity: number]
  remove: [id: number]
}>()

function incrementQuantity() {
  if (props.item.quantity < 10) {
    emit('update-quantity', props.item.id, props.item.quantity + 1)
  }
}

function decrementQuantity() {
  if (props.item.quantity > 1) {
    emit('update-quantity', props.item.id, props.item.quantity - 1)
  }
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB'
  }).format(price)
}

function getColorClass(color: string): string {
  const colorMap: Record<string, string> = {
    Красный: 'bg-red-500',
    Белый: 'bg-white border',
    Розовый: 'bg-pink-300',
    Синий: 'bg-blue-600',
    Черный: 'bg-gray-900',
    Зеленый: 'bg-green-500'
  }
  return colorMap[color] || 'bg-gray-300'
}
</script>
