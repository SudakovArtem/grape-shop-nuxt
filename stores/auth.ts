import { defineStore } from 'pinia'
import type { Auth } from '@/types'

export default defineStore('auth', () => {
  const state = reactive<Auth.Model>({
    isAuth: false,
    modalMode: 'login',
    isModalOpen: false
  })

  const isModalOpen = computed(() => state.isModalOpen)
  const modalMode = computed(() => state.modalMode)

  const isAuth = computed<boolean>(() => state.isAuth)

  const setAuth = (value: boolean): void => {
    state.isAuth = value
  }

  // Modal management
  function openModal(mode: 'login' | 'register' = 'login') {
    if (isModalOpen.value) {
      return
    }

    state.isModalOpen = true
    state.modalMode = mode
  }

  function closeModal() {
    state.isModalOpen = false
  }

  function setModalMode(mode: 'login' | 'register') {
    state.modalMode = mode
  }

  return {
    state,
    isAuth,
    setAuth,
    isModalOpen,
    modalMode,
    openModal,
    closeModal,
    setModalMode
  }
})
