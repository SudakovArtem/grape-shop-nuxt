<template>
  <UiCard class="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 py-0 gap-0">
    <NuxtLink :to="`/catalog/${id}`" class="block">
      <div class="aspect-square overflow-hidden">
        <NuxtImg
          v-if="images && images[0]"
          :src="images[0].url"
          :alt="name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div v-else class="w-full h-full bg-vine-100 flex items-center justify-center">
          <Icon name="i-lucide-grape" class="w-16 h-16 text-vine-300" />
        </div>
      </div>
    </NuxtLink>

    <div class="p-4">
      <div class="flex items-start justify-between mb-2">
        <h3 class="font-medium text-vine-800 line-clamp-2 flex-1">
          <NuxtLink :to="`/catalog/${id}`" class="hover:text-vine-600 transition-colors">
            {{ name }}
          </NuxtLink>
        </h3>
        <span v-if="!cuttingInStock" class="ml-2 px-2 py-1 bg-red-100 text-red-800 rounded text-xs flex-shrink-0">
          Нет в наличии
        </span>
      </div>

      <!-- Characteristics -->
      <div class="space-y-1 mb-3">
        <div v-if="color" class="flex items-center gap-2 text-xs text-vine-600">
          <div :class="getColorClass(color)" class="w-3 h-3 rounded-full border border-vine-300"></div>
          <span>{{ color }}</span>
        </div>
        <div v-if="berryShape" class="text-xs text-vine-600">Форма: {{ berryShape }}</div>
        <div v-if="taste" class="text-xs text-vine-600">Вкус: {{ taste }}</div>
      </div>

      <!--      &lt;!&ndash; Collection &ndash;&gt;-->
      <!--      <div v-if="collection" class="mb-3">-->
      <!--        <span class="px-2 py-1 bg-vine-100 text-vine-800 rounded text-xs">-->
      <!--          {{ collection.name }}-->
      <!--        </span>-->
      <!--      </div>-->

      <!-- Price and Actions -->
      <UiTabs v-model="productType" class="w-full gap-2">
        <UiTabsList class="w-full">
          <UiTabsTrigger value="cutting"> Черенок </UiTabsTrigger>
          <UiTabsTrigger value="seedling"> Саженец </UiTabsTrigger>
        </UiTabsList>
        <UiTabsContent value="cutting">
          <ProductCardPrice :price="cuttingPrice" :itemsInStock="cuttingInStock" type="cutting" :product-id="id" />
        </UiTabsContent>
        <UiTabsContent value="seedling">
          <ProductCardPrice :price="seedlingPrice" :itemsInStock="seedlingInStock" type="seedling" :product-id="id" />
        </UiTabsContent>
      </UiTabs>
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import type { Product } from '@/types'

defineProps<Product.Model>()

const productType = ref<'cutting' | 'seedling'>('cutting')

function getColorClass(color: string): string {
  const colorMap: Record<string, string> = {
    Красный: 'bg-red-500',
    Белый: 'bg-background',
    Розовый: 'bg-pink-300',
    Синий: 'bg-blue-600',
    Черный: 'bg-gray-900',
    Зеленый: 'bg-green-500'
  }
  return colorMap[color] || 'bg-gray-300'
}
</script>
