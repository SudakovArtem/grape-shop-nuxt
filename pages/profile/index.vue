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
            <UiBreadcrumbLink href="/profile"> Личный кабинет </UiBreadcrumbLink>
          </UiBreadcrumbItem>
        </UiBreadcrumbList>
      </UiBreadcrumb>

      <div class="mb-8">
        <h1 class="text-3xl font-bold text-vine-800 mb-4">Личный кабинет</h1>
        <p class="text-vine-600">Управляйте своим профилем и заказами</p>
      </div>

      <div v-if="!isAuth" class="text-center py-12">
        <div class="mb-4">
          <Icon name="i-lucide-wine" class="w-16 h-16 mx-auto text-vine-300" />
        </div>
        <h2 class="text-xl font-medium text-vine-800 mb-2">Вход в систему</h2>
        <p class="text-vine-600 mb-4">Войдите в систему для доступа к личному кабинету</p>
        <UiButton @click="authStore.openModal('login')"> Войти </UiButton>
      </div>

      <div v-else class="space-y-8">
        <!-- User Profile -->
        <UiCard class="p-6">
          <div class="flex justify-between items-start mb-6">
            <h2 class="text-xl font-semibold text-vine-800">Профиль</h2>
            <UiButton @click="editMode = !editMode" variant="outline" size="sm">
              {{ editMode ? 'Отменить' : 'Редактировать' }}
            </UiButton>
          </div>

          <UiForm 
            v-if="editMode" 
            v-slot="{ handleSubmit }" 
            as="" 
            keep-values 
            :validation-schema="toTypedSchema(profileSchema)"
            :initial-values="profileForm"
          >
            <form @submit="handleSubmit($event, saveProfile)" class="space-y-4">
              <div class="flex flex-col md:flex-row md:items-start gap-6">
                <!-- Avatar Section -->
                <div class="flex-shrink-0">
                  <UiFormField v-slot="{ componentField }" name="avatar">
                    <UiFormItem>
                      <UiFormLabel class="text-sm font-medium text-vine-700">Фото профиля</UiFormLabel>
                      <UiFormControl>
                        <AvatarUpload v-bind="componentField" />
                      </UiFormControl>
                      <UiFormMessage />
                    </UiFormItem>
                  </UiFormField>
                </div>

                <!-- Form Fields -->
                <div class="flex-1 space-y-4">
                  <UiFormField v-slot="{ componentField }" name="name">
                    <UiFormItem>
                      <UiFormLabel>Имя</UiFormLabel>
                      <UiFormControl>
                        <UiInput type="text" placeholder="Ваше имя" v-bind="componentField" />
                      </UiFormControl>
                      <UiFormMessage />
                    </UiFormItem>
                  </UiFormField>

                  <UiFormField v-slot="{ componentField }" name="phone">
                    <UiFormItem>
                      <UiFormLabel>Телефон (необязательно)</UiFormLabel>
                      <UiFormControl>
                        <UiInput type="tel" placeholder="+7 (999) 123-45-67" v-bind="componentField" />
                      </UiFormControl>
                      <UiFormMessage />
                    </UiFormItem>
                  </UiFormField>

                  <UiFormField v-slot="{ componentField }" name="address">
                    <UiFormItem>
                      <UiFormLabel>Адрес доставки (необязательно)</UiFormLabel>
                      <UiFormControl>
                        <UiInput type="text" placeholder="Ваш адрес" v-bind="componentField" />
                      </UiFormControl>
                      <UiFormMessage />
                    </UiFormItem>
                  </UiFormField>
                </div>
              </div>

              <div class="flex gap-2 pt-4 border-t border-vine-100">
                <UiButton type="submit" :disabled="saving">
                  {{ saving ? 'Сохранение...' : 'Сохранить' }}
                </UiButton>
                <UiButton @click="editMode = false" variant="outline" type="button">
                  Отменить
                </UiButton>
              </div>
            </form>
          </UiForm>

          <div v-else class="space-y-4">
            <div class="flex flex-col gap-6">
              <!-- Avatar Section -->
              <div class="flex-shrink-0">
                  <p class="text-sm text-vine-600 mb-2">Фото профиля</p>
                  <div class="w-24 h-24 rounded-full border-2 border-vine-200 overflow-hidden bg-vine-50 flex items-center justify-center">
                    <img 
                      v-if="user?.avatar" 
                      :src="user.avatar" 
                      alt="Avatar" 
                      class="w-full h-full object-cover"
                    />
                    <div v-else class="text-vine-400">
                      <Icon name="i-lucide-user" class="w-8 h-8" />
                    </div>
                </div>
              </div>

              <!-- User Info -->
              <div class="flex-1 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm text-vine-600">Имя</label>
                    <p class="font-medium">{{ user?.name || 'Не указано' }}</p>
                  </div>
                  <div>
                    <label class="block text-sm text-vine-600">Email</label>
                    <p class="font-medium">{{ user?.email }}</p>
                  </div>
                </div>
                <div>
                  <label class="block text-sm text-vine-600">Телефон</label>
                  <p class="font-medium">{{ user?.phone || 'Не указано' }}</p>
                </div>
                <div>
                  <label class="block text-sm text-vine-600">Адрес доставки</label>
                  <p class="font-medium">{{ user?.address || 'Не указано' }}</p>
                </div>
              </div>
            </div>
          </div>
        </UiCard>

        <!-- Order History -->
        <UiCard class="p-6">
          <h2 class="text-xl font-semibold text-vine-800 mb-6">История заказов</h2>

          <div v-if="isLoading" class="space-y-4">
            <div v-for="i in 3" :key="i" class="animate-pulse">
              <div class="bg-gray-200 h-20 rounded"></div>
            </div>
          </div>

          <div v-else-if="!isLoading && list.length > 0" class="space-y-4">
            <div
              v-for="order in list"
              :key="order.id"
              class="border border-vine-200 rounded-lg p-4 hover:bg-vine-50 transition-colors"
            >
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h3 class="font-medium text-vine-800">Заказ #{{ order.id }}</h3>
                  <p class="text-sm text-vine-600">{{ formatDate(order.createdAt) }}</p>
                </div>
                <div class="text-right">
                  <p class="font-medium">{{ formatPrice(order.totalPrice) }}</p>
                  <span :class="getStatusClass(order.status)" class="px-2 py-1 rounded text-xs">
                    {{ getStatusLabel(order.status) }}
                  </span>
                </div>
              </div>

              <div class="text-sm text-vine-600">
                <p>Товаров: {{ order.items?.length || 0 }}</p>
                <!--                <p v-if="order.deliveryAddress">Адрес: {{ order.deliveryAddress }}</p>-->
              </div>

              <div v-if="order.items && order.items.length > 0" class="mt-3 space-y-1">
                <div v-for="item in order.items" :key="item.id" class="flex justify-between text-sm">
                  <!--                  <span>{{ item.product?.name }} × {{ item.quantity }}</span>-->
                  <span>{{ formatPrice((Number(item.price) * item.quantity).toString()) }}</span>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-8">
            <Icon name="i-lucide-grape" class="w-12 h-12 mx-auto text-vine-300 mb-2" />
            <p class="text-vine-600">У вас пока нет заказов</p>
            <NuxtLink to="/catalog" class="inline-block mt-2">
              <UiButton size="sm">Начать покупки</UiButton>
            </NuxtLink>
          </div>

          <!-- Orders Pagination -->
          <UiPagination
            v-if="list.length > 0"
            v-slot="{ page }"
            :items-per-page="pageSize"
            :total="totalCount"
            :default-page="1"
          >
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
        </UiCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue-sonner'
import { z } from "zod"
import useAuthStore from '@/stores/auth'
import useUserStore from '@/stores/user'
import type { Response, Order } from '@/types'

const authStore = useAuthStore()
const { isAuth } = storeToRefs(authStore)
const { user } = storeToRefs(useUserStore())
const { order: orderService, user: userService } = useServices()

const editMode = ref(false)
const saving = ref(false)
const ordersLoading = ref(true)

const profileSchema = z.object({
  name: z.string().min(1, 'Введите ваше имя'),
  phone: z.string().optional(),
  address: z.string().optional(),
  avatar: z.string().nullable().optional()
})

const profileForm = reactive({
  name: '',
  phone: '',
  address: '',
  avatar: null as string | null
})

const {
  public: { baseApiUrl }
} = useRuntimeConfig()

onMounted(async () => {
  if (isAuth.value) {
    initProfileForm()
    // await loadOrders(1)
  }
})

function initProfileForm() {
  if (user.value) {
    profileForm.name = user.value.name || ''
    profileForm.phone = user.value.phone || ''
    profileForm.address = user.value.address || ''
    profileForm.avatar = user.value.avatar || null
  }
}

async function saveProfile(data: any) {
  saving.value = true
  try {
    await userService.updateProfile(data)
    
    toast({ 
      title: 'Успешно', 
      description: 'Профиль обновлен успешно.', 
      color: 'success' 
    })
    
    editMode.value = false
  } catch (error) {
    toast({ 
      title: 'Ошибка', 
      description: 'Произошла ошибка при обновлении профиля.', 
      color: 'error' 
    })
    console.error('Error saving profile:', error)
  } finally {
    saving.value = false
  }
}

const { pageNumber, pageSize, list, loadList, increasePageNumber, totalCount, setPageNumber } =
  usePagination<Order.Model>()

const { data: orders, status: ordersStatus } = await useLazyAsyncData(
  () =>
    orderService.getOrders({
      pageSize: unref(pageSize).toString(),
      pageNumber: unref(pageNumber).toString()
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
  return ['idle', 'pending'].includes(unref(ordersStatus))
})

watch(
  orders,
  (value) => {
    if (!value) {
      return
    }

    loadList(value?.data ?? [], (value.meta as Response.Pagination).total ?? 0)
  },
  { immediate: true }
)
// async function loadOrders(page: number = 1) {
//   ordersLoading.value = true
//   try {
//     const response = await $api('/orders', {
//       params: {
//         page,
//         limit: 10,
//         sortBy: '-createdAt'
//       }
//     })
//     orders.value = response.data || []
//     ordersMeta.value = response.meta || ordersMeta.value
//   } catch (error) {
//     console.error('Error loading orders:', error)
//     orders.value = []
//   } finally {
//     ordersLoading.value = false
//   }
// }

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function formatPrice(price: string): string {
  const priceNumber = Number(price)
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB'
  }).format(priceNumber)
}

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: 'Ожидает оплаты',
    processing: 'В обработке',
    shipped: 'Отправлен',
    delivered: 'Доставлен',
    cancelled: 'Отменен'
  }
  return labels[status] || status
}

function getStatusClass(status: string): string {
  const classes: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

// SEO
useHead({
  title: 'Личный кабинет - Саженцы винограда',
  meta: [
    {
      name: 'description',
      content: 'Личный кабинет - управление профилем, история заказов, настройки доставки.'
    }
  ]
})
</script>
