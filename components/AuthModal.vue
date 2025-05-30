<template>
  <UiDialog :open="authStore.isModalOpen" @update:open="authStore.closeModal">
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <UiCard class="w-full max-w-md">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-vine-800">
              {{ authStore.modalMode === 'login' ? 'Вход в систему' : 'Регистрация' }}
            </h2>
            <UiButton @click="authStore.closeModal" variant="ghost" size="sm">
              <Icon name="i-lucide-x" class="size-4" />
            </UiButton>
          </div>

          <!-- Login Form -->
          <UiForm 
            v-if="authStore.modalMode === 'login'" 
            v-slot="{ handleSubmit }" 
            as="" 
            :validation-schema="toTypedSchema(loginSchema)"
            :initial-values="{ email: '', password: '' }"
          >
            <form @submit="handleSubmit($event, onSubmit)" class="space-y-4">
              <UiFormField v-slot="{ componentField }" name="email">
                <UiFormItem>
                  <UiFormLabel>Email</UiFormLabel>
                  <UiFormControl>
                    <UiInput type="email" placeholder="your@email.com" v-bind="componentField" :disabled="loading" />
                  </UiFormControl>
                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>

              <UiFormField v-slot="{ componentField }" name="password">
                <UiFormItem>
                  <UiFormLabel>Пароль</UiFormLabel>
                  <UiFormControl>
                    <UiInput type="password" placeholder="Ваш пароль" v-bind="componentField" :disabled="loading" autocomplete="off" />
                  </UiFormControl>
                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>

              <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-md">
                <p class="text-red-700 text-sm">{{ error }}</p>
              </div>

              <UiButton type="submit" class="w-full bg-vine-600 hover:bg-vine-700 text-accent" :disabled="loading">
                {{ loading ? 'Вход...' : 'Войти' }}
              </UiButton>

              <div class="text-center">
                <button
                  type="button"
                  @click="authStore.setModalMode('register')"
                  class="text-vine-600 hover:text-vine-700 text-sm"
                >
                  Нет аккаунта? Зарегистрироваться
                </button>
              </div>
            </form>
          </UiForm>

          <!-- Register Form -->
          <UiForm 
            v-else 
            v-slot="{ handleSubmit }" 
            as="" 
            :validation-schema="toTypedSchema(registerSchema)"
            :initial-values="{ name: '', email: '', password: '', phone: '', address: '' }"
          >
            <form @submit="handleSubmit($event, onSubmit)" class="space-y-4">
              <UiFormField v-slot="{ componentField }" name="name">
                <UiFormItem>
                  <UiFormLabel>Имя *</UiFormLabel>
                  <UiFormControl>
                    <UiInput type="text" placeholder="Ваше имя" v-bind="componentField" :disabled="loading" />
                  </UiFormControl>
                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>

              <UiFormField v-slot="{ componentField }" name="email">
                <UiFormItem>
                  <UiFormLabel>Email *</UiFormLabel>
                  <UiFormControl>
                    <UiInput type="email" placeholder="your@email.com" v-bind="componentField" :disabled="loading" />
                  </UiFormControl>
                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>

              <UiFormField v-slot="{ componentField }" name="password">
                <UiFormItem>
                  <UiFormLabel>Пароль *</UiFormLabel>
                  <UiFormControl>
                    <UiInput type="password" placeholder="Минимум 6 символов" v-bind="componentField" :disabled="loading" autocomplete="off" />
                  </UiFormControl>
                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>

              <UiFormField v-slot="{ componentField }" name="phone">
                <UiFormItem>
                  <UiFormLabel>Телефон (необязательно)</UiFormLabel>
                  <UiFormControl>
                    <UiInput type="tel" placeholder="+7 (999) 123-45-67" v-bind="componentField" :disabled="loading" />
                  </UiFormControl>
                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>

              <UiFormField v-slot="{ componentField }" name="address">
                <UiFormItem>
                  <UiFormLabel>Адрес доставки (необязательно)</UiFormLabel>
                  <UiFormControl>
                    <UiInput type="text" placeholder="Ваш адрес" v-bind="componentField" :disabled="loading" />
                  </UiFormControl>
                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>

              <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-md">
                <p class="text-red-700 text-sm">{{ error }}</p>
              </div>

              <UiButton type="submit" class="w-full bg-vine-600 hover:bg-vine-700 text-accent" :disabled="loading">
                {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
              </UiButton>

              <div class="text-center">
                <button
                  type="button"
                  @click="authStore.setModalMode('login')"
                  class="text-vine-600 hover:text-vine-700 text-sm"
                >
                  Уже есть аккаунт? Войти
                </button>
              </div>
            </form>
          </UiForm>

          <div class="mt-6 pt-6 border-t border-vine-200">
            <p class="text-xs text-vine-500 text-center">
              Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных
            </p>
          </div>
        </div>
      </UiCard>
    </div>
  </UiDialog>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue-sonner'
import { z } from 'zod'
import useAuthStore from '@/stores/auth'

const authStore = useAuthStore()
const { user: userService } = useServices()

const loading = ref(false)
const error = ref('')

const loginSchema = z.object({
  email: z.string({ required_error: "Введите email" })
    .min(1, "Введите email")
    .email({ message: "Введите корректный email" }),
  password: z.string({ required_error: "Введите пароль" })
    .min(1, "Введите пароль")
    .min(6, 'Пароль должен содержать минимум 6 символов')
})

const registerSchema = z.object({
  name: z.string({ required_error: "Введите имя" })
    .min(1, "Введите имя"),
  email: z.string({ required_error: "Введите email" })
    .min(1, "Введите email")
    .email('Введите корректный email'),
  password: z.string({ required_error: "Введите пароль" })
    .min(1, "Введите пароль")
    .min(6, 'Пароль должен содержать минимум 6 символов'),
  phone: z.string().optional(),
  address: z.string().optional()
})

const currentSchema = computed(() => authStore.modalMode === 'login' ? loginSchema : registerSchema)

const loginForm = reactive({
  email: '',
  password: ''
})

const registerForm = reactive({
  name: '',
  email: '',
  password: '',
  phone: '',
  address: ''
})

async function onSubmit(data: any) {
  if (loading.value) return

  loading.value = true
  error.value = ''

  try {
    if (authStore.modalMode === 'login') {
      const user = await userService.login({
        email: data.email,
        password: data.password
      })

      if (user) {
        toast({ title: 'Успешно', description: 'Вход в аккаунт выполнен успешно.', color: 'success' })
        authStore.closeModal()
      }
    } else {
      const user = await userService.register({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address: data.address
      })

      if (user) {
        toast({ title: 'Успешно', description: 'Регистрация выполнена успешно.', color: 'success' })
        authStore.closeModal()
      }
    }
    authStore.closeModal()
  } catch (err: any) {
    const action = authStore.modalMode === 'login' ? 'входе в аккаунт' : 'регистрации'
    error.value = err.message || `Ошибка при ${action}`
    toast({ title: 'Ошибка', description: `Произошла ошибка при ${action}.`, color: 'error' })
  } finally {
    loading.value = false
  }
}
</script>
