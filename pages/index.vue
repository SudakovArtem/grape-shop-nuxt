<script setup lang="ts">
import type { Product, Response } from '@/types'

// Harvest images from stock photos
const harvestImages = [
  {
    src: 'https://pixabay.com/get/g6125c96cdf2059a5f0a4bc45a791a606b074dbca2f3055f7c054981912944cf4c784b9c29087eedc10fbbfe574e7dbac09c1fdcf37b4b3a04baf2b63529fdefc_1280.jpg',
    alt: 'Урожай винограда',
    description: 'Богатый урожай красных сортов'
  },
  {
    src: 'https://pixabay.com/get/gecf044f759e2c8371205b11550591c801fa22ca2acd0827abd8ca7c1927ee7715878f0e798df572a88eed3af9dc208d14358403418eb1bea3f92e8ac02bb6535_1280.jpg',
    alt: 'Сбор винограда',
    description: 'Ручной сбор спелых ягод'
  },
  {
    src: 'https://pixabay.com/get/g1283f2253dc473f23761bc287f02f7cbc379028c4acddee718eb73753cc82dd2768f63e9be9b8501b2579e716b88d618f9eb74a9992ecf96e7c434db1112f9d4_1280.jpg',
    alt: 'Виноградные гроздья',
    description: 'Идеальные гроздья винограда'
  },
  {
    src: 'https://pixabay.com/get/g2e8bd4abd729ffc6288cf46c90b99ffd938eba6d67de3218379e059051a68314f312c172fc74c33f2966e6361ff99ea3ad4bf62e59a40b5d9dcb3fb56c2d78bf_1280.jpg',
    alt: 'Урожай белого винограда',
    description: 'Солнечные белые сорта'
  },
  {
    src: 'https://pixabay.com/get/g42a494ec0830e074cca4b51bf964ce30918349f9e5cd62fbc097e220c138341689fa09783df864369872e63bd610a3daf2efccd68b6b01ac02b663de43c31e53_1280.jpg',
    alt: 'Виноград в корзине',
    description: 'Свежий урожай в корзине'
  },
  {
    src: 'https://pixabay.com/get/g339f3534b656f81b897fa3d09ecc007717b51f2fc18758dbcee300d559ec445c546235f626162beb8a07f3a6f52d8ab6ee117476a633a17f395df2a87be76bbb_1280.jpg',
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
              src="https://pixabay.com/get/gaf643efc7daa57d018d274466e9d3f76edd79a9184248157185eb8527355c5a22aa560812407bb604daff1fccea5c17b277305bd8225b8c6c63048865ef9cac3_1280.jpg"
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
              src="https://pixabay.com/get/gf0ae5f91ad640c8c982b56f3357181c961c725d4695ea4c816cdc5717bdfabc06064a183b0b6a64fb935b00cdc9037c8e91db333389db5ab9c07216c3e357b67_1280.jpg"
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
