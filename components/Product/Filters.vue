<script setup lang="ts">
import { debounce } from 'lodash'

interface Filters {
  search: string
  berryShape: string
  color: string[]
  taste: string[]
  collection: string
  maturationPeriod: string
  inStock: boolean
}

interface Collection {
  id: number
  name: string
}

const props = defineProps<{
  filters: Filters
}>()

const emit = defineEmits<{
  'update:filters': [filters: Filters]
}>()

const localFilters = computed<Filters>({
  get: () => props.filters,
  set: (filters) => emit('update:filters', filters)
})

const {
  constants: { colors, flavors, berryShapes, ripeningPeriods, collections }
} = useConfigs()

const hasActiveFilters = computed(() => {
  return (
    localFilters.value.search !== '' ||
    localFilters.value.berryShape !== '' ||
    localFilters.value.color.length !== 0 ||
    localFilters.value.taste.length !== 0 ||
    localFilters.value.maturationPeriod !== '' ||
    localFilters.value.collection !== '' ||
    localFilters.value.inStock
  )
})

// Debounced update for search input
const debouncedUpdate = debounce(() => {
  updateFilters()
}, 500)

// Watch for external filter changes
watch(
  () => props.filters,
  (newFilters) => {
    Object.assign(localFilters, newFilters)
  },
  { deep: true }
)

function updateFilters() {
  emit('update:filters', { ...localFilters.value })
}

// function toggleColor(color: string) {
//   localFilters.value.color = localFilters.value.color === color ? '' : color
//   updateFilters()
// }

// function toggleTaste(taste: string) {
//   localFilters.taste = localFilters.taste === taste ? '' : taste
//   updateFilters()
// }

function toggleInStock(checked: boolean) {
  localFilters.value.inStock = checked
  updateFilters()
}

function clearFilters() {
  localFilters.value.search = ''
  localFilters.value.berryShape = ''
  localFilters.value.color = []
  localFilters.value.taste = []
  localFilters.value.collection = ''
  localFilters.value.maturationPeriod = ''
  localFilters.value.inStock = false
  updateFilters()
}

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

// onMounted(async () => {
//   // Load collections for filter
//   try {
//     const response = await $api('/collections')
//     collections.value = response.data || []
//   } catch (error) {
//     console.error('Error loading collections:', error)
//   }
// })
</script>

<template>
  <UiCard class="p-6">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-vine-800">Фильтры</h3>
      <UiButton @click="clearFilters" variant="ghost" size="sm" class="text-vine-600"> Сбросить </UiButton>
    </div>

    <!-- Search -->
    <div>
      <label class="block text-sm font-medium text-vine-700 mb-2">Поиск</label>
      <UiInput v-model="localFilters.search" placeholder="Название сорта..." @input="debouncedUpdate" />
    </div>

    <!-- Berry Shape -->
    <div>
      <UiSelect v-model="localFilters.berryShape">
        <UiSelectTrigger class="w-full">
          <UiSelectValue placeholder="Форма ягоды" />
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectGroup>
            <UiSelectItem :value="item" v-for="item in berryShapes">
              {{ item }}
            </UiSelectItem>
          </UiSelectGroup>
        </UiSelectContent>
      </UiSelect>
    </div>
    <div>
      <UiSelect v-model="localFilters.maturationPeriod">
        <UiSelectTrigger class="w-full">
          <UiSelectValue placeholder="Период созревания" />
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectGroup>
            <UiSelectItem :value="item" v-for="item in ripeningPeriods">
              {{ item }}
            </UiSelectItem>
          </UiSelectGroup>
        </UiSelectContent>
      </UiSelect>
    </div>

    <!--    <UiSelect v-model="localFilters.berryShape" :items="berryShapes" class="w-full" size="xl" />-->
    <!--    <UiSelect v-model="localFilters.maturationPeriod" :items="ripeningPeriods" class="w-full" size="xl" />-->

    <!-- Color -->
    <div>
      <UiSelect v-model="localFilters.color">
        <UiSelectTrigger class="w-full">
          <UiSelectValue placeholder="Цвет" />
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectGroup>
            <UiSelectItem :value="item" v-for="item in colors">
              {{ item }}
            </UiSelectItem>
          </UiSelectGroup>
        </UiSelectContent>
      </UiSelect>
    </div>
    <div>
      <UiSelect v-model="localFilters.taste">
        <UiSelectTrigger class="w-full">
          <UiSelectValue placeholder="Вкус" />
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectGroup>
            <UiSelectItem :value="item" v-for="item in flavors">
              {{ item }}
            </UiSelectItem>
          </UiSelectGroup>
        </UiSelectContent>
      </UiSelect>
      <!--      <UiSelect v-model="localFilters.taste" :items="flavors" class="w-full" size="xl" />-->
      <!--        <label v-for="color in colors" :key="color" class="flex items-center gap-2">-->
      <!--          <UiCheckbox v-model="localFilters.color" @change="toggleColor()" />-->
      <!--          <div class="flex items-center gap-2">-->
      <!--            <div :class="getColorClass(color)" class="w-4 h-4 rounded-full border border-vine-300"></div>-->
      <!--            <span class="text-sm">{{ color }}</span>-->
      <!--          </div>-->
      <!--        </label>-->
    </div>

    <!-- Taste -->
    <!--    <div class="space-y-2">-->
    <!--      <UiFormField-->
    <!--        v-for="item in flavors"-->
    <!--        v-slot="{ value, handleChange }"-->
    <!--        :key="item"-->
    <!--        :value="item"-->
    <!--        type="checkbox"-->
    <!--        v-model="localFilters.taste"-->
    <!--        :unchecked-value="false"-->
    <!--      >-->
    <!--        <UiFormItem class="flex flex-row items-start space-x-3 space-y-0">-->
    <!--          <UiFormControl>-->
    <!--            <UiCheckbox :model-value="localFilters.taste.includes(item)" @update:model-value="handleChange" />-->
    <!--          </UiFormControl>-->
    <!--          <UiFormLabel class="font-normal">-->
    <!--            {{ item }}-->
    <!--          </UiFormLabel>-->
    <!--        </UiFormItem>-->
    <!--      </UiFormField>-->
    <!--    </div>-->
    <!--    <div>-->
    <!--      <label class="block text-sm font-medium text-vine-700 mb-2">Вкус</label>-->
    <!--      <div class="space-y-2">-->
    <!--        <label v-for="taste in flavors" :key="taste" class="flex items-center gap-2">-->
    <!--          <UiCheckbox v-model="localFilters.taste" @change="toggleTaste()" />-->
    <!--          <span class="text-sm">{{ taste }}</span>-->
    <!--        </label>-->
    <!--      </div>-->
    <!--    </div>-->

    <!--    &lt;!&ndash; Collection &ndash;&gt;-->
    <!--    <div v-if="collections.length > 0">-->
    <!--      <label class="block text-sm font-medium text-vine-700 mb-2">Коллекция</label>-->
    <!--      <select-->
    <!--        v-model="localFilters.collection"-->
    <!--        @change="updateFilters"-->
    <!--        class="w-full px-3 py-2 border border-vine-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vine-500"-->
    <!--      >-->
    <!--        <option value="">Все коллекции</option>-->
    <!--        <option v-for="collection in collections" :key="collection.id" :value="collection.id">-->
    <!--          {{ collection.name }}-->
    <!--        </option>-->
    <!--      </select>-->
    <!--    </div>-->

    <!-- In Stock -->
    <div>
      <label class="flex items-center gap-2">
        <UiCheckbox v-model="localFilters.inStock" />
        <span class="text-sm font-medium text-vine-700">Только в наличии</span>
      </label>
    </div>

    <!-- Active Filters Summary -->
    <div v-if="hasActiveFilters" class="border-t border-vine-200 pt-4">
      <h4 class="text-sm font-medium text-vine-700 mb-2">Активные фильтры:</h4>
      <div class="flex flex-wrap gap-2">
        <span v-if="localFilters.search" class="px-2 py-1 bg-vine-100 text-vine-800 rounded text-xs">
          "{{ localFilters.search }}"
        </span>
        <span v-if="localFilters.berryShape" class="px-2 py-1 bg-vine-100 text-vine-800 rounded text-xs">
          {{ localFilters.berryShape }}
        </span>
        <span v-if="localFilters.color" class="px-2 py-1 bg-vine-100 text-vine-800 rounded text-xs">
          {{ localFilters.color }}
        </span>
        <span v-if="localFilters.taste" class="px-2 py-1 bg-vine-100 text-vine-800 rounded text-xs">
          {{ localFilters.taste }}
        </span>
        <span v-if="localFilters.inStock" class="px-2 py-1 bg-vine-100 text-vine-800 rounded text-xs"> В наличии </span>
      </div>
    </div>
  </UiCard>
</template>
