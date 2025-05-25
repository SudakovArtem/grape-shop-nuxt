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
          <form v-if="authStore.modalMode === 'login'" @submit.prevent="handleLogin" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-vine-700 mb-1">Email</label>
              <UiInput
                v-model="loginForm.email"
                type="email"
                required
                placeholder="your@email.com"
                :disabled="loading"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-vine-700 mb-1">Пароль</label>
              <UiInput
                v-model="loginForm.password"
                type="password"
                required
                placeholder="Ваш пароль"
                :disabled="loading"
              />
            </div>

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

          <!-- Register Form -->
          <form v-else @submit.prevent="handleRegister" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-vine-700 mb-1">Имя *</label>
              <UiInput v-model="registerForm.name" required placeholder="Ваше имя" :disabled="loading" />
            </div>

            <div>
              <label class="block text-sm font-medium text-vine-700 mb-1">Email *</label>
              <UiInput
                v-model="registerForm.email"
                type="email"
                required
                placeholder="your@email.com"
                :disabled="loading"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-vine-700 mb-1">Пароль *</label>
              <UiInput
                v-model="registerForm.password"
                type="password"
                required
                placeholder="Минимум 6 символов"
                :disabled="loading"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-vine-700 mb-1">Телефон</label>
              <UiInput v-model="registerForm.phone" type="tel" placeholder="+7 (999) 123-45-67" :disabled="loading" />
            </div>

            <div>
              <label class="block text-sm font-medium text-vine-700 mb-1">Адрес доставки</label>
              <UiInput v-model="registerForm.address" placeholder="Ваш адрес" :disabled="loading" />
            </div>

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
import useAuthStore from '@/stores/auth'

const authStore = useAuthStore()

const loading = ref(false)
const error = ref('')

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

// Clear forms and error when modal mode changes
watch(
  () => authStore.modalMode,
  () => {
    error.value = ''
    Object.keys(loginForm).forEach((key) => {
      loginForm[key] = ''
    })
    Object.keys(registerForm).forEach((key) => {
      registerForm[key] = ''
    })
  }
)

async function handleLogin() {
  if (loading.value) return

  loading.value = true
  error.value = ''

  try {
    await authStore.login({
      email: loginForm.email,
      password: loginForm.password
    })
    // Modal will be closed by the store on successful login
  } catch (err: any) {
    error.value = err.message || 'Ошибка входа в систему'
  } finally {
    loading.value = false
  }
}

async function handleRegister() {
  if (loading.value) return

  loading.value = true
  error.value = ''

  try {
    await authStore.register({
      name: registerForm.name,
      email: registerForm.email,
      password: registerForm.password,
      phone: registerForm.phone || undefined,
      address: registerForm.address || undefined
    })
    // Modal will be closed by the store on successful registration
  } catch (err: any) {
    error.value = err.message || 'Ошибка регистрации'
  } finally {
    loading.value = false
  }
}
</script>
