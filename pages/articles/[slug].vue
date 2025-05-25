<script setup lang="ts">
import type { Article } from '@/types'

const route = useRoute()
const {
  public: { baseApiUrl }
} = useRuntimeConfig()

const relatedArticles = ref([])
const copied = ref(false)

const {
  data: article,
  refresh,
  status
} = await useAsyncData<Article.Model>(() => {
  return $fetch(`${baseApiUrl}/articles/slug/${route.params.slug}`)
})

const isLoading = computed<boolean>(() => {
  return ['idle', 'pending'].includes(unref(status))
})

// async function fetchRelatedArticles() {
//   try {
//     const response = await $api('/articles', {
//       params: {
//         limit: 4,
//         category: article.value.category?.id,
//         exclude: article.value.id
//       }
//     })
//     relatedArticles.value = response.data || []
//   } catch (error) {
//     console.error('Error fetching related articles:', error)
//   }
// }

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function shareToSocial(platform: string) {
  const url = window.location.href
  const title = article.value?.title || ''

  let shareUrl = ''

  switch (platform) {
    case 'vk':
      shareUrl = `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
      break
    case 'telegram':
      shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
      break
  }

  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (error) {
    console.error('Error copying to clipboard:', error)
  }
}

// SEO
useHead(() => ({
  title: article.value ? `${article.value.title} - Статьи о виноградарстве` : 'Статья не найдена',
  meta: [
    {
      name: 'description',
      content: article.value ? article.value.authorName || article.value.title : 'Статья не найдена'
    },
    {
      property: 'og:title',
      content: article.value ? article.value.title : 'Статья не найдена'
    },
    {
      property: 'og:description',
      content: article.value ? article.value.authorName || article.value.title : 'Статья не найдена'
    },
    {
      property: 'og:image',
      content: article.value?.imageUrl || '/og-image.png'
    }
  ]
}))
</script>

<template>
  <div class="py-8">
    <div class="container mx-auto">
      <UiBreadcrumb v-if="article">
        <UiBreadcrumbList>
          <UiBreadcrumbItem>
            <UiBreadcrumbLink href="/"> Главная </UiBreadcrumbLink>
          </UiBreadcrumbItem>
          <UiBreadcrumbSeparator />
          <UiBreadcrumbItem>
            <UiBreadcrumbLink href="/articles"> Статьи </UiBreadcrumbLink>
          </UiBreadcrumbItem>
          <UiBreadcrumbSeparator />
          <UiBreadcrumbItem>
            <UiBreadcrumbPage>{{ article.title }}</UiBreadcrumbPage>
          </UiBreadcrumbItem>
        </UiBreadcrumbList>
      </UiBreadcrumb>

      <div v-if="isLoading" class="animate-pulse">
        <div class="bg-gray-200 h-8 rounded mb-4"></div>
        <div class="bg-gray-200 h-6 rounded mb-6 w-3/4"></div>
        <div class="bg-gray-200 h-64 rounded mb-6"></div>
        <div class="space-y-4">
          <div class="bg-gray-200 h-4 rounded"></div>
          <div class="bg-gray-200 h-4 rounded"></div>
          <div class="bg-gray-200 h-4 rounded w-5/6"></div>
        </div>
      </div>

      <article v-else-if="article">
        <header class="mb-8">
          <div class="flex items-center gap-4 mb-4">
            <span class="px-3 py-1 bg-vine-100 text-vine-800 rounded-full text-sm">
              {{ article.categoryName }}
            </span>
            <time class="text-vine-500 text-sm">
              {{ formatDate(article.createdAt) }}
            </time>
          </div>

          <h1 class="text-3xl lg:text-4xl font-bold text-vine-800 mb-4">
            {{ article.title }}
          </h1>

          <p v-if="article.authorName" class="text-xl text-vine-600 leading-relaxed">
            {{ article.authorName }}
          </p>
        </header>

        <div v-if="article.imageUrl" class="mb-8">
          <NuxtImg
            :src="article.imageUrl"
            :alt="article.title"
            class="w-full h-96 object-cover rounded-lg shadow-lg"
            loading="eager"
          />
        </div>

        <div class="prose prose-lg prose-vine max-w-none mb-12" v-html="article.content"></div>

        <!-- Share Buttons -->
        <div class="border-t border-vine-200 pt-8 mb-8">
          <h3 class="text-lg font-semibold text-vine-800 mb-4">Поделиться статьей</h3>
          <div class="flex gap-4">
            <UiButton @click="shareToSocial('vk')" variant="outline" size="sm" class="flex items-center gap-2">
              ВКонтакте
            </UiButton>
            <UiButton @click="shareToSocial('telegram')" variant="outline" size="sm" class="flex items-center gap-2">
              Telegram
            </UiButton>
            <UiButton @click="copyLink" variant="outline" size="sm" class="flex items-center gap-2">
              {{ copied ? 'Скопировано!' : 'Копировать ссылку' }}
            </UiButton>
          </div>
        </div>

        <!-- Related Articles -->
        <section v-if="relatedArticles.length > 0" class="border-t border-vine-200 pt-8">
          <h2 class="text-2xl font-bold text-vine-800 mb-6">Похожие статьи</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UiCard
              v-for="related in relatedArticles"
              :key="related.id"
              class="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <NuxtLink :to="`/articles/${related.slug}`" class="block">
                <div v-if="related.imageUrl" class="aspect-video">
                  <NuxtImg
                    :src="related.imageUrl"
                    :alt="related.title"
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div class="p-6">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="px-2 py-1 bg-vine-100 text-vine-800 rounded text-xs">
                      {{ related.categoryName }}
                    </span>
                    <span class="text-xs text-vine-500">
                      {{ formatDate(related.createdAt) }}
                    </span>
                  </div>
                  <h3 class="text-lg font-semibold text-vine-800 mb-2 line-clamp-2">
                    {{ related.title }}
                  </h3>
                  <p class="text-vine-600 text-sm line-clamp-2">
                    {{ related.authorName }}
                  </p>
                </div>
              </NuxtLink>
            </UiCard>
          </div>
        </section>
      </article>

      <!-- Error State -->
      <div v-else class="text-center py-12 max-w-4xl mx-auto">
        <div class="mb-4">
          <Icon name="i-lucide-wine" class="w-16 h-16 mx-auto text-vine-300" />
          <!--          <VineIcon class="w-16 h-16 mx-auto text-vine-300" />-->
        </div>
        <h1 class="text-2xl font-bold text-vine-800 mb-2">Статья не найдена</h1>
        <p class="text-vine-600 mb-4">Возможно, статья была удалена или перемещена</p>
        <NuxtLink to="/articles">
          <UiButton>Вернуться к статьям</UiButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<!--<style>-->
<!--.prose-vine {-->
<!--  @apply text-vine-700;-->
<!--}-->

<!--.prose-vine h1,-->
<!--.prose-vine h2,-->
<!--.prose-vine h3,-->
<!--.prose-vine h4,-->
<!--.prose-vine h5,-->
<!--.prose-vine h6 {-->
<!--  @apply text-vine-800;-->
<!--}-->

<!--.prose-vine a {-->
<!--  @apply text-vine-600 hover:text-vine-700;-->
<!--}-->

<!--.prose-vine blockquote {-->
<!--  @apply border-l-vine-500 bg-vine-50 text-vine-700;-->
<!--}-->
<!--</style>-->
