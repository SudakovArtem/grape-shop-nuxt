<template>
  <div class="relative">
    <div v-if="images && images.length > 0" class="space-y-4">
      <!--      &lt;!&ndash; Main Image &ndash;&gt;-->
      <!--      <div class="aspect-square overflow-hidden rounded-lg bg-vine-100">-->
      <!--        <NuxtImg :src="images[currentIndex]" :alt="alt" class="w-full h-full object-cover" loading="eager" />-->
      <!--      </div>-->

      <UiCarousel class="relative w-full" @init-api="(val) => (emblaMainApi = val)">
        <UiCarouselContent>
          <UiCarouselItem v-for="(image, index) in images">
            <div class="p-1">
              <div class="flex aspect-square items-center justify-center">
                <NuxtImg
                  :src="image.url"
                  :alt="`${alt} - изображение ${index + 1}`"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </UiCarouselItem>
        </UiCarouselContent>
        <UiCarouselPrevious />
        <UiCarouselNext />
      </UiCarousel>

      <UiCarousel class="relative w-full max-w-xs" @init-api="(val) => (emblaThumbnailApi = val)">
        <UiCarouselContent class="flex gap-1 ml-0">
          <UiCarouselItem
            v-for="(image, index) in images"
            :key="index"
            class="pl-0 basis-1/4 cursor-pointer"
            @click="onThumbClick(index)"
          >
            <div class="p-1" :class="index === selectedIndex ? '' : 'opacity-50'">
              <div class="flex aspect-square items-center justify-center">
                <NuxtImg
                  :src="image.url"
                  :alt="`${alt} - изображение ${index + 1}`"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </UiCarouselItem>
        </UiCarouselContent>
      </UiCarousel>
    </div>

    <!-- Placeholder for no images -->
    <div v-else class="aspect-square bg-vine-100 rounded-lg flex items-center justify-center">
      <div class="text-center">
        <Icon name="i-lucide-grape" class="w-16 h-16 mx-auto text-vine-300 mb-2" />
        <p class="text-vine-500 text-sm">Изображение недоступно</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types'
import { watchOnce } from '@vueuse/core'
import { type CarouselApi } from '@/components/ui/carousel'

const props = defineProps<{
  images?: Product.Model['images']
  alt: string
}>()

const emblaMainApi = ref<CarouselApi>()
const emblaThumbnailApi = ref<CarouselApi>()
const selectedIndex = ref(0)

function onSelect() {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return
  selectedIndex.value = emblaMainApi.value.selectedScrollSnap()
  emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap())
}

function onThumbClick(index: number) {
  console.log(index)
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return
  emblaMainApi.value.scrollTo(index)
}

watchOnce(emblaMainApi, (emblaMainApi) => {
  if (!emblaMainApi) return

  onSelect()
  emblaMainApi.on('select', onSelect)
  emblaMainApi.on('reInit', onSelect)
})
</script>
