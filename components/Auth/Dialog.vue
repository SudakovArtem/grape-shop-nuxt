<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue-sonner'
import * as z from 'zod'
import useAuthStore from '@/stores/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { closeModal } = authStore
const { isModalOpen } = storeToRefs(authStore)
const { user: userService } = useServices()
const isSending = ref<boolean>(false)

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

async function onSubmit(data: any) {
  isSending.value = true

  try {
    const user = await userService.login({
      email: data.email,
      password: data.password
    })

    if (user) {
      toast({ title: 'Success', description: 'Вход в аккаунт выполнен успешно.', color: 'success' })
      closeModal()
    }
  } catch (error) {
    toast({ title: 'Error', description: 'Произошла ошибка при входе в аккаунт.', color: 'error' })
    console.error(error)
  } finally {
    isSending.value = false
  }
}
</script>

<template>
  <UiForm v-slot="{ handleSubmit }" as="" keep-values :validation-schema="toTypedSchema(formSchema)">
    <UiDialog :open="isModalOpen" @update:open="closeModal">
      <UiDialogContent class="sm:max-w-[425px]">
        <UiDialogHeader>
          <UiDialogTitle>Вход в систему</UiDialogTitle>
        </UiDialogHeader>

        <form id="dialogForm" @submit="handleSubmit($event, onSubmit)" class="flex flex-col gap-4">
          <UiFormField v-slot="{ componentField }" name="email">
            <UiFormItem>
              <UiFormLabel>Email</UiFormLabel>
              <UiFormControl>
                <UiInput type="text" placeholder="your@email.com" v-bind="componentField" />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
          <UiFormField v-slot="{ componentField }" name="password">
            <UiFormItem>
              <UiFormLabel>Пароль</UiFormLabel>
              <UiFormControl>
                <UiInput type="password" placeholder="Ваш пароль" v-bind="componentField" />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
        </form>

        <div class="text-center">
          <button type="button" class="text-vine-600 hover:text-vine-700 text-sm">
            Нет аккаунта? Зарегистрироваться
          </button>
        </div>

        <UiDialogFooter>
          <UiButton type="submit" form="dialogForm" class="w-full"> Войти </UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </UiForm>
</template>
