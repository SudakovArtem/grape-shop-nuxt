import { defineStore } from 'pinia'
import type { Auth } from '@/types'

export default defineStore('auth', () => {
  const state = reactive<Auth.Model>({
    isAuth: false
  })
  const isModalOpen = ref(false)
  const modalMode = ref<'login' | 'register'>('login')

  const isAuth = computed<boolean>(() => state.isAuth)

  const setAuth = (value: boolean): void => {
    state.isAuth = value
  }

  // Modal management
  function openModal(mode: 'login' | 'register' = 'login') {
    modalMode.value = mode
    isModalOpen.value = true
  }

  function closeModal() {
    isModalOpen.value = false
  }

  function setModalMode(mode: 'login' | 'register') {
    modalMode.value = mode
  }

  return {
    state,
    isAuth,
    setAuth,
    isModalOpen: readonly(isModalOpen),
    modalMode: readonly(modalMode),
    openModal,
    closeModal,
    setModalMode
  }
})
