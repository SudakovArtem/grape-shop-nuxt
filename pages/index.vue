<script setup lang="ts">
import type { Product, Response } from '@/types'

// Harvest images from stock photos
const harvestImages = [
  {
    src: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=800&h=600&fit=crop&crop=center',
    alt: 'Урожай винограда',
    description: 'Богатый урожай красных сортов'
  },
  {
    src: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&h=600&fit=crop&crop=center',
    alt: 'Сбор винограда',
    description: 'Ручной сбор спелых ягод'
  },
  {
    src: 'https://images.unsplash.com/photo-1508108712903-49b7ef9b1df8?w=800&h=600&fit=crop&crop=center',
    alt: 'Виноградные гроздья',
    description: 'Идеальные гроздья винограда'
  },
  {
    src: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800&h=600&fit=crop&crop=center',
    alt: 'Урожай белого винограда',
    description: 'Солнечные белые сорта'
  },
  {
    src: 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=800&h=600&fit=crop&crop=center',
    alt: 'Виноград в корзине',
    description: 'Свежий урожай в корзине'
  },
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center',
    alt: 'Осенний урожай',
    description: 'Осенние краски винограда'
  }
]

const { product: productService } = useServices()

const { pageNumber, pageSize, list, loadList, setPageNumber, totalCount } = usePagination<Product.Model>({
  pageSize: 4,
  replace: true
})

const { data: popularProducts, status: productsStatus } = await useLazyAsyncData(
  () =>
    productService.getProducts({
      pageSize: unref(pageSize).toString(),
      pageNumber: unref(pageNumber).toString(),
      sortBy: 'price_asc'
    }),
  {
    default: () => ({
      data: [],
      meta: {}
    }),
    watch: [pageNumber]
  }
)

const isLoading = computed<boolean>(() => {
  return ['idle', 'pending'].includes(unref(productsStatus))
})

watch(
  popularProducts,
  (value) => {
    if (!value) {
      return
    }

    loadList(value?.data ?? [], (value?.meta as Response.Pagination)?.total ?? 0)
  },
  { immediate: true }
)

// SEO
useHead({
  title: 'Виноградные саженцы - Качественные саженцы для вашего сада',
  meta: [
    {
      name: 'description',
      content:
        'Качественные саженцы и черенки винограда. Выращено с любовью в экологически чистом районе. Ограниченные партии, каждый саженец уникален.'
    }
  ]
})
</script>

<template>
  <div class="p-8">
    <!-- Hero Section -->
    <section class="bg-vine-100 p-8 rounded-lg mb-8">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl font-bold text-vine-800 mb-6">🍇 Качественные саженцы винограда для вашего сада</h1>
        <p class="text-xl text-vine-600 mb-8 max-w-2xl mx-auto">
          Выращено с любовью в экологически чистом районе. Каждый саженец уникален, количество ограничено.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/catalog" class="bg-vine-600 hover:bg-vine-700 text-accent px-8 py-4 rounded-lg">
            Посмотреть каталог
          </NuxtLink>
          <NuxtLink to="/articles" class="border-2 border-vine-600 text-vine-600 hover:bg-vine-50 px-8 py-4 rounded-lg">
            Узнать больше
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Popular Products -->
    <section class="py-16 bg-background/50">
      <div class="container mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-vine-800 mb-4">Популярные сорта</h2>
          <p class="text-vine-600 max-w-2xl mx-auto">Самые востребованные саженцы винограда из нашей коллекции</p>
        </div>

        <div v-if="list.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <ProductCard v-for="product in list" :key="product.id" v-bind="product" />
        </div>
        <!--        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">-->
        <!--          <div v-for="i in 8" :key="`product-${i}`" class="animate-pulse">-->
        <!--            <div class="bg-gray-200 h-64 rounded-lg mb-4"></div>-->
        <!--            <div class="bg-gray-200 h-4 rounded mb-2"></div>-->
        <!--            <div class="bg-gray-200 h-4 rounded w-3/4"></div>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--        <div v-else class="text-center py-12">-->
        <!--          <p class="text-vine-600">Товары временно недоступны</p>-->
        <!--        </div>-->
      </div>
    </section>

    <!-- Benefits -->
    <section class="py-16">
      <div class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-vine-100 rounded-full flex items-center justify-center">
              <Icon name="i-lucide-wine" class="size-8 text-vine-600" />
              <!--              <VineIcon class="w-8 h-8 text-vine-600" />-->
            </div>
            <h3 class="text-xl font-semibold text-vine-800 mb-2">Выращено с любовью</h3>
            <p class="text-vine-600">Каждый саженец выращен с особой заботой и вниманием к деталям</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-vine-100 rounded-full flex items-center justify-center">
              <Icon name="i-lucide-hand-coins" class="size-8 text-vine-600" />
              <!--              <HandsIcon class="w-8 h-8 text-vine-600" />-->
            </div>
            <h3 class="text-xl font-semibold text-vine-800 mb-2">Ручной отбор</h3>
            <p class="text-vine-600">Только лучшие саженцы попадают в нашу коллекцию</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-vine-100 rounded-full flex items-center justify-center">
              <Icon name="i-lucide-grape" class="size-8 text-vine-600" />
            </div>
            <h3 class="text-xl font-semibold text-vine-800 mb-2">Ограниченные партии</h3>
            <p class="text-vine-600">Уникальность каждого сорта, небольшие партии высокого качества</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Harvest Examples -->
    <section class="py-16 bg-background/50">
      <div class="container mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-vine-800 mb-4">Смотрите, какой урожай можно вырастить!</h2>
          <p class="text-vine-600 max-w-2xl mx-auto">Примеры урожая, выращенного из наших саженцев</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(image, index) in harvestImages" :key="index" class="relative group overflow-hidden rounded-lg">
            <NuxtImg :src="image.src" :alt="image.alt"
              class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="absolute bottom-4 left-4 text-accent">
                <p class="text-sm font-medium">{{ image.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Story -->
    <section class="py-16">
      <div class="container mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold text-vine-800 mb-6">Наш маленький виноградник</h2>
            <p class="text-vine-600 mb-4">
              Мы — семейный бизнес, который вот уже много лет занимается выращиванием качественных саженцев винограда.
              Каждый саженец — это результат нашей любви к делу и многолетнего опыта.
            </p>
            <p class="text-vine-600 mb-4">
              Наши саженцы растут в экологически чистом районе, вдали от промышленных зон. Мы не занимаемся массовым
              производством — каждая партия ограничена, что позволяет нам контролировать качество каждого растения.
            </p>
            <p class="text-vine-600">Здесь каждый саженец — это забота, внимание и частичка нашей души.</p>
          </div>
          <div class="relative">
            <NuxtImg
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center"
              alt="Наш виноградник" class="w-full h-80 object-cover rounded-lg shadow-lg" loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-tr from-vine-600/20 to-transparent rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Where We Grow -->
    <section class="py-16 bg-background/50">
      <div class="container mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1">
            <NuxtImg
              src="https://images.unsplash.com/photo-1508108712903-49b7ef9b1df8?w=800&h=600&fit=crop&crop=center"
              alt="Место выращивания" class="w-full h-80 object-cover rounded-lg shadow-lg" loading="lazy" />
          </div>
          <div class="order-1 lg:order-2">
            <h2 class="text-3xl font-bold text-vine-800 mb-6">Где выращиваются наши саженцы</h2>
            <p class="text-vine-600 mb-4">
              Наш питомник расположен в экологически чистом районе с идеальными условиями для выращивания винограда.
              Чистый воздух, плодородная почва и много солнца создают оптимальную среду для развития здоровых растений.
            </p>
            <p class="text-vine-600 mb-4">
              Мы тщательно следим за состоянием почвы, используем только натуральные удобрения и никогда не применяем
              агрессивную химию. Каждое растение получает индивидуальный уход.
            </p>
            <p class="text-vine-600">
              Благодаря этому наши саженцы отличаются высокой приживаемостью и отличным здоровьем.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
