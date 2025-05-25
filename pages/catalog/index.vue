<template>
  <div class="py-8">
    <div class="container mx-auto">
      <UiBreadcrumb>
        <UiBreadcrumbList>
          <UiBreadcrumbItem>
            <UiBreadcrumbLink href="/"> Главная </UiBreadcrumbLink>
          </UiBreadcrumbItem>
          <UiBreadcrumbSeparator />
          <UiBreadcrumbItem>
            <UiBreadcrumbLink href="/catalog"> Каталог </UiBreadcrumbLink>
          </UiBreadcrumbItem>
        </UiBreadcrumbList>
      </UiBreadcrumb>

      <div class="mb-8">
        <h1 class="text-3xl font-bold text-vine-800 mb-4">Каталог саженцев</h1>
        <p class="text-vine-600">Выберите идеальные саженцы винограда для вашего сада</p>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar -->
        <aside class="lg:w-80">
          <ProductFilters v-model:filters="filters" />
        </aside>

        <!-- Products Grid -->
        <main class="flex-1">
          <!-- Results Header -->
          <div class="flex justify-between items-center mb-6">
            <p class="text-vine-600">
              {{ isLoading ? 'Загрузка...' : `Найдено товаров: ${totalCount || 0}` }}
            </p>

            <div class="flex items-center gap-2 w-max">
              <span class="text-sm text-vine-600">Сортировка:</span>
              <UiToggleGroup type="single" variant="outline" v-model="sortBy" class="w-full">
                <UiToggleGroupItem value="createdAt_desc" aria-label="Toggle bold" class="shrink-0 w-fit flex-auto">
                  <span class="shrink-0 w-fit">Новые</span>
                </UiToggleGroupItem>
                <UiToggleGroupItem value="name_desc" aria-label="Toggle italic" class="shrink-0 w-fit flex-auto">
                  <span class="shrink-0 w-fit">По названию</span>
                </UiToggleGroupItem>
                <UiToggleGroupItem value="price_asc" aria-label="Toggle underline" class="shrink-0 w-fit flex-auto">
                  <span class="shrink-0 w-fit">Цена: по возрастанию</span>
                </UiToggleGroupItem>
                <UiToggleGroupItem value="price_desc" aria-label="Toggle underline" class="shrink-0 w-fit flex-auto">
                  <span class="shrink-0 w-fit">Цена: по убыванию</span>
                </UiToggleGroupItem>
              </UiToggleGroup>
            </div>
          </div>

          <!-- Products Grid -->
          <div v-if="list.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <ProductCard v-for="product in list" :key="product.id" v-bind="product" />
          </div>

          <!-- Loading State -->
          <div v-else-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div v-for="i in pageSize" :key="i" class="animate-pulse">
              <div class="bg-gray-200 h-64 rounded-lg mb-4"></div>
              <div class="bg-gray-200 h-4 rounded mb-2"></div>
              <div class="bg-gray-200 h-4 rounded w-3/4"></div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-12">
            <div class="mb-4">
              <Icon name="i-lucide-grape" class="w-16 h-16 mx-auto text-vine-300" />
            </div>
            <h3 class="text-xl font-medium text-vine-800 mb-2">Товары не найдены</h3>
            <p class="text-vine-600 mb-4">Попробуйте изменить параметры поиска</p>
            <UiButton variant="outline"> Сбросить фильтры </UiButton>
          </div>

          <!-- Pagination -->
          <UiPagination v-slot="{ page }" :items-per-page="pageSize" :total="totalCount" :default-page="1">
            <UiPaginationContent v-slot="{ items }">
              <UiPaginationPrevious @click="setPageNumber(pageNumber > 1 ? pageNumber - 1 : 1)" />

              <template v-for="(item, index) in items" :key="index">
                <UiPaginationItem
                  v-if="item.type === 'page'"
                  :value="item.value"
                  :is-active="item.value === page"
                  @click="setPageNumber(item.value)"
                >
                  {{ item.value }}
                </UiPaginationItem>
              </template>

              <!--              <UiPaginationEllipsis :index="4" />-->

              <UiPaginationNext @click="increasePageNumber" />
            </UiPaginationContent>
          </UiPagination>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Response, Product } from '@/types'
import { debounce } from 'lodash'

const { product: productService } = useServices()

const { pageNumber, pageSize, list, loadList, setPageNumber, totalCount, increasePageNumber } =
  usePagination<Product.Model>({
    replace: true,
    pageSize: 3
  })

// const search = ref<string>('')

const onSearch = debounce(() => {
  console.log(123)
  setPageNumber(1)
  refresh()
}, 800)

const sortBy = ref('createdAt_desc')
const filters = reactive({
  search: '',
  berryShape: '',
  color: [],
  taste: [],
  collection: '',
  maturationPeriod: '',
  inStock: false
})

watch(filters, onSearch, { deep: true })
watch(sortBy, onSearch)
const {
  data: products,
  status: productsStatus,
  refresh
} = useAsyncData(
  () =>
    productService.getProducts({
      pageSize: unref(pageSize).toString(),
      pageNumber: unref(pageNumber).toString(),
      ...filters,
      sortBy: unref(sortBy)
    }),
  {
    default: () => ({
      data: [],
      meta: {}
    }),
    watch: [pageNumber]
  }
)

const isSending = ref<boolean>(false)
const isLoading = computed<boolean>(() => {
  return ['idle', 'pending'].includes(unref(productsStatus)) || unref(isSending)
})

watch(
  products,
  (value) => {
    if (!value) {
      return
    }

    loadList(value?.data ?? [], (value.meta as Response.Pagination)?.total ?? 0)
  },
  { immediate: true }
)

function applyFilters() {
  setPageNumber(1)
  // updateURL()
  refresh()
}

// function clearFilters() {
//   Object.keys(filters).forEach(key => {
//     filters[key] = key === 'inStock' ? false : ''
//   })
//   sortBy.value = '-createdAt'
//   meta.value.page = 1
//   updateURL()
//   fetchProducts()
// }

// function updateURL() {
//   const query = {
//     ...Object.fromEntries(
//       Object.entries(filters).filter(([_, value]) =>
//         value !== '' && value !== false
//       )
//     ),
//     sortBy: sortBy.value,
//     page: meta.value.page > 1 ? meta.value.page : undefined
//   }
//
//   router.push({ query })
// }

// SEO
useHead({
  title: 'Каталог саженцев винограда - Качественные саженцы',
  meta: [
    {
      name: 'description',
      content:
        'Большой выбор саженцев и черенков винограда. Фильтры по сортам, цвету, вкусу. Быстрая доставка качественных растений.'
    }
  ]
})
</script>
