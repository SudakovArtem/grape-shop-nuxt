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
            <UiBreadcrumbLink href="/contact"> Контакты </UiBreadcrumbLink>
          </UiBreadcrumbItem>
        </UiBreadcrumbList>
      </UiBreadcrumb>

      <div class="mb-8">
        <h1 class="text-3xl font-bold text-vine-800 mb-4">Контакты</h1>
        <p class="text-vine-600">Свяжитесь с нами для получения консультации</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Information -->
        <div class="space-y-8">
          <UiCard class="p-6">
            <h2 class="text-xl font-semibold text-vine-800 mb-4">Контактная информация</h2>

            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <div class="w-6 h-6 mt-1 flex-shrink-0">
                  <svg class="w-full h-full text-vine-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-medium text-vine-800">Телефон</h3>
                  <p class="text-vine-600">+7 (999) 123-45-67</p>
                  <p class="text-sm text-vine-500">Пн-Пт: 9:00-18:00</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-6 h-6 mt-1 flex-shrink-0">
                  <svg class="w-full h-full text-vine-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-medium text-vine-800">Email</h3>
                  <p class="text-vine-600">info@grapeseedlings.ru</p>
                  <p class="text-sm text-vine-500">Ответим в течение 24 часов</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-6 h-6 mt-1 flex-shrink-0">
                  <svg class="w-full h-full text-vine-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-medium text-vine-800">Адрес питомника</h3>
                  <p class="text-vine-600">Краснодарский край, ст. Виноградная, ул. Садовая, 15</p>
                  <p class="text-sm text-vine-500">Самовывоз по предварительной договоренности</p>
                </div>
              </div>
            </div>
          </UiCard>

          <UiCard class="p-6">
            <h2 class="text-xl font-semibold text-vine-800 mb-4">Режим работы</h2>

            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-vine-600">Понедельник - Пятница</span>
                <span class="font-medium">9:00 - 18:00</span>
              </div>
              <div class="flex justify-between">
                <span class="text-vine-600">Суббота</span>
                <span class="font-medium">10:00 - 16:00</span>
              </div>
              <div class="flex justify-between">
                <span class="text-vine-600">Воскресенье</span>
                <span class="font-medium">Выходной</span>
              </div>
            </div>

            <div class="mt-4 p-3 bg-vine-50 rounded-lg">
              <p class="text-sm text-vine-700">
                <strong>Важно:</strong> Самовывоз осуществляется только по предварительной договоренности. Обязательно
                звоните заранее!
              </p>
            </div>
          </UiCard>
        </div>

        <!-- Contact Form -->
        <div>
          <UiCard class="p-6">
            <h2 class="text-xl font-semibold text-vine-800 mb-4">Написать нам</h2>

            <form @submit.prevent="submitForm" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-vine-700 mb-1"> Имя * </label>
                <UiInput v-model="form.name" required placeholder="Ваше имя" />
              </div>

              <div>
                <label class="block text-sm font-medium text-vine-700 mb-1"> Email * </label>
                <UiInput v-model="form.email" type="email" required placeholder="your@email.com" />
              </div>

              <div>
                <label class="block text-sm font-medium text-vine-700 mb-1"> Телефон </label>
                <UiInput v-model="form.phone" type="tel" placeholder="+7 (999) 123-45-67" />
              </div>

              <div>
                <label class="block text-sm font-medium text-vine-700 mb-1"> Тема </label>
                <select
                  v-model="form.subject"
                  class="w-full px-3 py-2 border border-vine-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vine-500"
                >
                  <option value="">Выберите тему</option>
                  <option value="consultation">Консультация по сортам</option>
                  <option value="order">Вопрос по заказу</option>
                  <option value="delivery">Доставка и самовывоз</option>
                  <option value="care">Уход за саженцами</option>
                  <option value="other">Другое</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-vine-700 mb-1"> Сообщение * </label>
                <textarea
                  v-model="form.message"
                  required
                  rows="4"
                  placeholder="Ваше сообщение..."
                  class="w-full px-3 py-2 border border-vine-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vine-500"
                ></textarea>
              </div>

              <UiButton type="submit" class="w-full bg-vine-600 hover:bg-vine-700 text-white" :disabled="sending">
                {{ sending ? 'Отправка...' : 'Отправить сообщение' }}
              </UiButton>

              <p class="text-xs text-vine-500 text-center">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных
              </p>
            </form>

            <div v-if="sent" class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p class="text-green-700 text-sm">✓ Сообщение отправлено! Мы свяжемся с вами в ближайшее время.</p>
            </div>
          </UiCard>
        </div>
      </div>

      <!-- Map Section -->
      <section class="mt-12">
        <UiCard class="p-6">
          <h2 class="text-xl font-semibold text-vine-800 mb-4">Как нас найти</h2>

          <div class="aspect-video bg-vine-100 rounded-lg flex items-center justify-center">
            <!-- Placeholder for map -->
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-2 bg-vine-200 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-vine-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <p class="text-vine-600">Карта будет добавлена позже</p>
              <p class="text-sm text-vine-500">Краснодарский край, ст. Виноградная, ул. Садовая, 15</p>
            </div>
          </div>
        </UiCard>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const { $api } = useNuxtApp()

const sending = ref(false)
const sent = ref(false)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const breadcrumbs = [
  { label: 'Главная', href: '/' },
  { label: 'Контакты', href: '/contact' }
]

async function submitForm() {
  console.log('submitForm')
  // sending.value = true
  // try {
  //   await $api('/contact', {
  //     method: 'POST',
  //     body: {
  //       name: form.name,
  //       email: form.email,
  //       phone: form.phone,
  //       subject: form.subject,
  //       message: form.message
  //     }
  //   })
  //
  //   // Reset form
  //   Object.keys(form).forEach(key => {
  //     form[key] = ''
  //   })
  //
  //   sent.value = true
  //   setTimeout(() => {
  //     sent.value = false
  //   }, 5000)
  // } catch (error) {
  //   console.error('Error sending message:', error)
  //   // Show error message
  // } finally {
  //   sending.value = false
  // }
}

// SEO
useHead({
  title: 'Контакты - Саженцы винограда',
  meta: [
    {
      name: 'description',
      content:
        'Контактная информация питомника саженцев винограда. Телефон, email, адрес для самовывоза, форма обратной связи.'
    }
  ]
})
</script>
