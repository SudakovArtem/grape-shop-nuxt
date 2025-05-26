
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue-sonner'
import * as z from 'zod'
import useAuthStore from '@/stores/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { closeModal, setModalMode } = authStore
const { isModalOpen, modalMode } = storeToRefs(authStore)
const { user: userService } = useServices()
const isSending = ref<boolean>(false)

const isLoginMode = computed(() => modalMode.value === 'login')
const isRegisterMode = computed(() => modalMode.value === 'register')

const loginSchema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов')
})

const registerSchema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
  passwordRepeat: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
  name: z.string().min(1, 'Введите ваше имя'),
  phone: z.string().optional(),
  address: z.string().optional()
}).refine((data) => data.password === data.passwordRepeat, {
  message: "Пароли не совпадают",
  path: ["passwordRepeat"],
})

const currentSchema = computed(() => isLoginMode.value ? loginSchema : registerSchema)

async function onSubmit(data: any) {
  isSending.value = true

  try {
    if (isLoginMode.value) {
      const user = await userService.login({
        email: data.email,
        password: data.password
      })

      if (user) {
        toast({ title: 'Успешно', description: 'Вход в аккаунт выполнен успешно.', color: 'success' })
        closeModal()
      }
    } else {
      const user = await userService.register({
        email: data.email,
        password: data.password,
        name: data.name,
        phone: data.phone,
        address: data.address
      })

      if (user) {
        toast({ title: 'Успешно', description: 'Регистрация выполнена успешно.', color: 'success' })
        closeModal()
      }
    }
  } catch (error) {
    const action = isLoginMode.value ? 'входе в аккаунт' : 'регистрации'
    toast({ title: 'Ошибка', description: `Произошла ошибка при ${action}.`, color: 'error' })
    console.error(error)
  } finally {
    isSending.value = false
  }
}

function switchMode() {
  setModalMode(isLoginMode.value ? 'register' : 'login')
}
</script>

<template>
  <UiForm v-slot="{ handleSubmit }" as="" keep-values :validation-schema="toTypedSchema(currentSchema)">
    <UiDialog :open="isModalOpen" @update:open="closeModal">
      <UiDialogContent class="sm:max-w-[425px]">
        <UiDialogHeader>
          <UiDialogTitle>
            {{ isLoginMode ? 'Вход в систему' : 'Регистрация' }}
          </UiDialogTitle>
        </UiDialogHeader>

        <form id="dialogForm" @submit="handleSubmit($event, onSubmit)" class="flex flex-col gap-4">
          <!-- Email field (common for both modes) -->
          <UiFormField v-slot="{ componentField }" name="email">
            <UiFormItem>
              <UiFormLabel>Email</UiFormLabel>
              <UiFormControl>
                <UiInput type="email" placeholder="your@email.com" v-bind="componentField" />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>

          <!-- Name field (only for registration) -->
          <UiFormField v-if="isRegisterMode" v-slot="{ componentField }" name="name">
            <UiFormItem>
              <UiFormLabel>Имя</UiFormLabel>
              <UiFormControl>
                <UiInput type="text" placeholder="Ваше имя" v-bind="componentField" />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>

          <!-- Phone field (only for registration) -->
          <UiFormField v-if="isRegisterMode" v-slot="{ componentField }" name="phone">
            <UiFormItem>
              <UiFormLabel>Телефон (необязательно)</UiFormLabel>
              <UiFormControl>
                <UiInput type="tel" placeholder="+7 (999) 123-45-67" v-bind="componentField" />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>

          <!-- Address field (only for registration) -->
          <UiFormField v-if="isRegisterMode" v-slot="{ componentField }" name="address">
            <UiFormItem>
              <UiFormLabel>Адрес (необязательно)</UiFormLabel>
              <UiFormControl>
                <UiInput type="text" placeholder="Ваш адрес" v-bind="componentField" />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>

          <!-- Password field (common for both modes) -->
          <UiFormField v-slot="{ componentField }" name="password">
            <UiFormItem>
              <UiFormLabel>Пароль</UiFormLabel>
              <UiFormControl>
                <UiInput type="password" placeholder="Ваш пароль" v-bind="componentField" autocomplete="off" />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>

          <!-- Password repeat field (only for registration) -->
          <UiFormField v-if="isRegisterMode" v-slot="{ componentField }" name="passwordRepeat">
            <UiFormItem>
              <UiFormLabel>Повторите пароль</UiFormLabel>
              <UiFormControl>
                <UiInput type="password" placeholder="Повторите пароль" v-bind="componentField" autocomplete="off" />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
        </form>

        <div class="text-center">
          <button type="button" @click="switchMode" class="text-vine-600 hover:text-vine-700 text-sm">
            {{ isLoginMode ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти' }}
          </button>
        </div>

        <UiDialogFooter>
          <UiButton type="submit" form="dialogForm" class="w-full" :disabled="isSending">
            {{ isSending ? 'Загрузка...' : (isLoginMode ? 'Войти' : 'Зарегистрироваться') }}
          </UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </UiForm>
</template>
