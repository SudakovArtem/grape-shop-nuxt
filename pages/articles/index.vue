<script setup lang="ts">
import { debounce } from 'lodash'
import type { Article, Response } from '@/types'

const {
  public: { baseApiUrl }
} = useRuntimeConfig()
const { article: articleService } = useServices()

// const categories = ref([])
const searchQuery = ref('')
const selectedCategories = ref<Array<Article.Category['id']>>([])

const { pageNumber, pageSize, list, loadList, setPageNumber, totalCount, increasePageNumber } =
  usePagination<Article.Model>({
    replace: true,
    pageSize: 3
  })

// const search = ref<string>('')

const onSearch = debounce(() => {
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
  data: articles,
  status: articlesStatus,
  refresh
} = await useLazyAsyncData(
  () => articleService.getArticles({ pageSize: unref(pageSize).toString(), pageNumber: unref(pageNumber).toString() }),
  {
    default: () => ({
      data: [],
      meta: {}
    }),
    watch: [pageNumber]
  }
)

const { data: categories, status: categoriesStatus } = await useLazyAsyncData(
  () => articleService.getArticlesCategories(),
  {
    default: () => [] as Article.Category[]
  }
)

const isSending = ref<boolean>(false)
const isLoading = computed<boolean>(() => {
  return ['idle', 'pending'].includes(unref(articlesStatus)) || unref(isSending)
})

watch(
  articles,
  (value) => {
    if (!value) {
      return
    }

    loadList(value?.data ?? [], (value.meta as Response.Pagination)?.total ?? 0)
  },
  { immediate: true }
)

// Debounced search
// const debouncedSearch = debounce(() => {
//   applyFilters()
// }, 500)

// onMounted(async () => {
//   await Promise.all([fetchCategories()])
//   // await fetchArticles()
// })

// async function fetchCategories() {
//   try {
//     const response = await $fetch(`${baseApiUrl}/article-categories`)
//     categories.value = response || []
//   } catch (error) {
//     console.error('Error fetching categories:', error)
//   }
// }

// function initializeFromURL() {
//   const params = route.query
//   searchQuery.value = (params.search as string) || ''
//   selectedCategories.value = params.categories ? (params.categories as string).split(',').map(Number) : []
//   meta.value.page = parseInt(params.page as string) || 1
// }

// async function fetchArticles() {
//   loading.value = true
//   try {
//     const params = {
//       page: meta.value.page,
//       limit: meta.value.limit,
//       search: searchQuery.value,
//       categories: selectedCategories.value.length > 0 ? selectedCategories.value.join(',') : undefined
//     }
//
//     const response = await $api('/articles', {
//       params: Object.fromEntries(Object.entries(params).filter(([_, value]) => value !== undefined && value !== ''))
//     })
//     articles.value = response.data || []
//     meta.value = response.meta || meta.value
//   } catch (error) {
//     console.error('Error fetching articles:', error)
//     articles.value = []
//   } finally {
//     loading.value = false
//   }
// }

// function toggleCategory(categoryId: number) {
//   const index = selectedCategories.value.indexOf(categoryId)
//   if (index > -1) {
//     selectedCategories.value.splice(index, 1)
//   } else {
//     selectedCategories.value.push(categoryId)
//   }
//   applyFilters()
// }

// function applyFilters() {
//   meta.value.page = 1
//   updateURL()
//   fetchArticles()
// }

// function changePage(page: number) {
//   meta.value.page = page
//   updateURL()
//   fetchArticles()
// }

function clearFilters() {
  searchQuery.value = ''
  selectedCategories.value = []
  // meta.value.page = 1
  // updateURL()
  // fetchArticles()
}

// function updateURL() {
//   const query = {
//     search: searchQuery.value || undefined,
//     categories: selectedCategories.value.length > 0 ? selectedCategories.value.join(',') : undefined,
//     page: meta.value.page > 1 ? meta.value.page : undefined
//   }
//
//   router.push({
//     query: Object.fromEntries(Object.entries(query).filter(([_, value]) => value !== undefined))
//   })
// }

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// SEO
useHead({
  title: 'Статьи о виноградарстве - Полезные советы и рекомендации',
  meta: [
    {
      name: 'description',
      content:
        'Полезные статьи о выращивании винограда, уходе за саженцами, выборе сортов. Экспертные советы от опытных виноградарей.'
    }
  ]
})
</script>

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
            <UiBreadcrumbLink href="/articles"> Статьи </UiBreadcrumbLink>
          </UiBreadcrumbItem>
        </UiBreadcrumbList>
      </UiBreadcrumb>

      <div class="mb-8">
        <h1 class="text-3xl font-bold text-vine-800 mb-4">Статьи о виноградарстве</h1>
        <p class="text-vine-600">Полезная информация о выращивании и уходе за виноградом</p>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar -->
        <aside class="lg:w-80">
          <UiCard class="p-6">
            <h3 class="text-lg font-semibold text-vine-800 mb-4">Категории</h3>
            <div class="space-y-2">
              <label v-for="category in categories" :key="category.id" class="flex items-center gap-2">
                <UiCheckbox :checked="selectedCategories.includes(category.id)" />
                <span class="text-sm">{{ category.name }}</span>
              </label>
            </div>

            <div class="mt-6">
              <UiInput v-model="searchQuery" placeholder="Поиск по статьям..." />
            </div>
          </UiCard>
        </aside>

        <!-- Articles Grid -->
        <main class="flex-1">
          <!-- Results Header -->
          <div class="flex justify-between items-center mb-6">
            <p class="text-vine-600">
              {{ isLoading ? 'Загрузка...' : `Найдено статей: ${totalCount || 0}` }}
            </p>
          </div>

          <!-- Loading State -->
          <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div v-for="i in 6" :key="i" class="animate-pulse">
              <div class="bg-gray-200 h-48 rounded-t-lg"></div>
              <div class="p-6">
                <div class="bg-gray-200 h-4 rounded mb-2"></div>
                <div class="bg-gray-200 h-4 rounded mb-2"></div>
                <div class="bg-gray-200 h-4 rounded w-3/4"></div>
              </div>
            </div>
          </div>

          <!-- Articles Grid -->
          <div v-else-if="!isLoading && list.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <UiCard
              v-for="article in list"
              :key="article.id"
              class="overflow-hidden hover:shadow-lg transition-shadow py-0 gap-0"
            >
              <NuxtLink :to="`/articles/${article.slug}`" class="block">
                <div v-if="article.imageUrl" class="aspect-video">
                  <NuxtImg
                    :src="article.imageUrl"
                    :alt="article.title"
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div class="p-6">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="px-2 py-1 bg-vine-100 text-vine-800 rounded text-xs">
                      {{ article.categoryName }}
                    </span>
                    <span class="text-xs text-vine-500">
                      {{ formatDate(article.createdAt) }}
                    </span>
                  </div>
                  <h3 class="text-lg font-semibold text-vine-800 mb-2 line-clamp-2">
                    {{ article.title }}
                  </h3>
                  <p class="text-vine-600 text-sm line-clamp-3">
                    {{ article.authorName }}
                  </p>
                  <div class="mt-4">
                    <span class="text-vine-600 hover:text-vine-700 text-sm font-medium"> Читать далее → </span>
                  </div>
                </div>
              </NuxtLink>
            </UiCard>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-12">
            <div class="mb-4">
              <Icon name="i-lucide-wine" class="w-16 h-16 mx-auto text-vine-300" />
              <!--              <VineIcon class="w-16 h-16 mx-auto text-vine-300" />-->
            </div>
            <h3 class="text-xl font-medium text-vine-800 mb-2">Статьи не найдены</h3>
            <p class="text-vine-600 mb-4">Попробуйте изменить параметры поиска</p>
            <UiButton @click="clearFilters" variant="outline"> Сбросить фильтры </UiButton>
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
              <UiPaginationNext @click="increasePageNumber" />
            </UiPaginationContent>
          </UiPagination>
        </main>
      </div>
    </div>
  </div>
</template>
