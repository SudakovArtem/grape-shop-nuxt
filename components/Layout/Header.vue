<template>
  <header class="bg-background/95 backdrop-blur-sm border-b border-vine-200 sticky top-0 z-50">
    <div class="container mx-auto">
      <div class="flex items-center justify-between py-4">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3">
          <!--          <LogoIcon class="w-10 h-10 text-vine-600" />-->
          <div class="hidden sm:block">
            <h1 class="text-xl font-bold text-vine-800">Виноградные саженцы</h1>
            <p class="text-xs text-vine-600">Выращено с любовью</p>
          </div>
        </NuxtLink>

        <!-- Navigation -->
        <UiNavigationMenu>
          <UiNavigationMenuList>
            <UiNavigationMenuItem>
              <NuxtLink v-slot="{ isActive, href, navigate }" to="/" custom>
                <UiNavigationMenuLink :active="isActive" :href :class="navigationMenuTriggerStyle()" @click="navigate">
                  Главная
                </UiNavigationMenuLink>
              </NuxtLink>
            </UiNavigationMenuItem>
            <UiNavigationMenuItem>
              <NuxtLink v-slot="{ isActive, href, navigate }" to="/catalog" custom>
                <UiNavigationMenuLink :active="isActive" :href :class="navigationMenuTriggerStyle()" @click="navigate">
                  Каталог
                </UiNavigationMenuLink>
              </NuxtLink>
            </UiNavigationMenuItem>
            <UiNavigationMenuItem>
              <NuxtLink v-slot="{ isActive, href, navigate }" to="/articles" custom>
                <UiNavigationMenuLink :active="isActive" :href :class="navigationMenuTriggerStyle()" @click="navigate">
                  Статьи
                </UiNavigationMenuLink>
              </NuxtLink>
            </UiNavigationMenuItem>
            <UiNavigationMenuItem>
              <NuxtLink v-slot="{ isActive, href, navigate }" to="/contact" custom>
                <UiNavigationMenuLink :active="isActive" :href :class="navigationMenuTriggerStyle()" @click="navigate">
                  Контакты
                </UiNavigationMenuLink>
              </NuxtLink>
            </UiNavigationMenuItem>
            <UiNavigationMenuItem>
              <NuxtLink v-slot="{ isActive, href, navigate }" to="/shipping" custom>
                <UiNavigationMenuLink :active="isActive" :href :class="navigationMenuTriggerStyle()" @click="navigate">
                  Доставка
                </UiNavigationMenuLink>
              </NuxtLink>
            </UiNavigationMenuItem>
          </UiNavigationMenuList>
        </UiNavigationMenu>
        <!--        <nav class="hidden lg:flex items-center space-x-8">-->
        <!--          <NuxtLink-->
        <!--            to="/"-->
        <!--            class="text-vine-700 hover:text-vine-800 transition-colors"-->
        <!--            :class="{ 'text-vine-800 font-medium': $route.path === '/' }"-->
        <!--          >-->
        <!--            Главная-->
        <!--          </NuxtLink>-->
        <!--          <NuxtLink-->
        <!--            to="/catalog"-->
        <!--            class="text-vine-700 hover:text-vine-800 transition-colors"-->
        <!--            :class="{ 'text-vine-800 font-medium': $route.path.startsWith('/catalog') }"-->
        <!--          >-->
        <!--            Каталог-->
        <!--          </NuxtLink>-->
        <!--          <NuxtLink-->
        <!--            to="/articles"-->
        <!--            class="text-vine-700 hover:text-vine-800 transition-colors"-->
        <!--            :class="{ 'text-vine-800 font-medium': $route.path.startsWith('/articles') }"-->
        <!--          >-->
        <!--            Статьи-->
        <!--          </NuxtLink>-->
        <!--          <NuxtLink-->
        <!--            to="/contact"-->
        <!--            class="text-vine-700 hover:text-vine-800 transition-colors"-->
        <!--            :class="{ 'text-vine-800 font-medium': $route.path === '/contact' }"-->
        <!--          >-->
        <!--            Контакты-->
        <!--          </NuxtLink>-->
        <!--          <NuxtLink-->
        <!--            to="/shipping"-->
        <!--            class="text-vine-700 hover:text-vine-800 transition-colors"-->
        <!--            :class="{ 'text-vine-800 font-medium': $route.path === '/shipping' }"-->
        <!--          >-->
        <!--            Доставка-->
        <!--          </NuxtLink>-->
        <!--        </nav>-->

        <!-- Actions -->
        <div class="flex items-center gap-4">
          <!-- Search -->
          <div class="relative w-64 items-center">
            <UiInput
              id="search"
              class="pl-10"
              v-model="searchQuery"
              @keyup.enter="performSearch"
              type="text"
              placeholder="Поиск саженцев..."
            />
            <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
              <Icon name="i-lucide-search" class="size-5" />
            </span>
          </div>

          <!-- Cart -->
          <NuxtLink to="/cart" class="relative">
            <UiButton variant="ghost" size="sm" class="relative">
              <Icon name="i-lucide-shopping-cart" class="size-5" />
              <span
                v-if="cartStore.totalItems > 0"
                class="absolute -top-2 -right-2 bg-vine-600 text-accent text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {{ cartStore.totalItems }}
              </span>
            </UiButton>
          </NuxtLink>

          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="outline">
                <Icon
                  name="i-lucide-moon"
                  class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                />
                <Icon
                  name="i-lucide-sun"
                  class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                />
                <span class="sr-only">Toggle theme</span>
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="end">
              <UiDropdownMenuItem @click="colorMode.preference = 'light'"> Light </UiDropdownMenuItem>
              <UiDropdownMenuItem @click="colorMode.preference = 'dark'"> Dark </UiDropdownMenuItem>
              <UiDropdownMenuItem @click="colorMode.preference = 'system'"> System </UiDropdownMenuItem>
            </UiDropdownMenuContent>
          </UiDropdownMenu>

          <!-- User Menu -->
          <div class="relative">
            <UiButton v-if="!isAuth" @click="openModal('login')" variant="outline" size="sm"> Войти </UiButton>
            <div v-else class="relative">
              <UiButton @click="showUserMenu = !showUserMenu" variant="ghost" size="sm" class="flex items-center gap-2">
                <Icon name="i-lucide-user-round" class="size-5" />
                <span class="hidden sm:inline">{{ user?.name || 'Профиль' }}</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"></path>
                </svg>
              </UiButton>

              <div
                v-if="showUserMenu"
                class="absolute right-0 mt-2 w-48 bg-background rounded-lg shadow-lg border border-vine-200 py-1 z-10"
              >
                <NuxtLink
                  to="/profile"
                  class="block px-4 py-2 text-sm text-vine-700 hover:bg-vine-50"
                  @click="showUserMenu = false"
                >
                  Личный кабинет
                </NuxtLink>
                <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-vine-700 hover:bg-vine-50">
                  Выйти
                </button>
              </div>
            </div>
          </div>

          <!-- Mobile Menu Toggle -->
          <UiButton @click="showMobileMenu = !showMobileMenu" variant="ghost" size="sm" class="lg:hidden">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </UiButton>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="showMobileMenu" class="lg:hidden border-t border-vine-200 py-4">
        <nav class="space-y-2">
          <NuxtLink to="/" class="block py-2 text-vine-700 hover:text-vine-800" @click="showMobileMenu = false">
            Главная
          </NuxtLink>
          <NuxtLink to="/catalog" class="block py-2 text-vine-700 hover:text-vine-800" @click="showMobileMenu = false">
            Каталог
          </NuxtLink>
          <NuxtLink to="/articles" class="block py-2 text-vine-700 hover:text-vine-800" @click="showMobileMenu = false">
            Статьи
          </NuxtLink>
          <NuxtLink to="/contact" class="block py-2 text-vine-700 hover:text-vine-800" @click="showMobileMenu = false">
            Контакты
          </NuxtLink>
          <NuxtLink to="/shipping" class="block py-2 text-vine-700 hover:text-vine-800" @click="showMobileMenu = false">
            Доставка
          </NuxtLink>
        </nav>

        <!-- Mobile Search -->
        <div class="mt-4 relative">
          <input
            v-model="searchQuery"
            @keyup.enter="performSearch"
            type="text"
            placeholder="Поиск саженцев..."
            class="w-full pl-10 pr-4 py-2 border border-vine-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vine-500 text-sm"
          />
          <svg
            class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-vine-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import useAuthStore from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import useUserStore from '@/stores/user'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'

const colorMode = useColorMode()
const authStore = useAuthStore()
const { openModal } = authStore
const { isAuth } = storeToRefs(authStore)
const cartStore = useCartStore()
const router = useRouter()
const { user } = storeToRefs(useUserStore())

const searchQuery = ref('')
const showMobileMenu = ref(false)
const showUserMenu = ref(false)

function performSearch() {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/catalog',
      query: { search: searchQuery.value.trim() }
    })
    searchQuery.value = ''
    showMobileMenu.value = false
  }
}

async function logout() {
  // await authStore.logout()
  // showUserMenu.value = false
  console.log('logout')
}

// Close menus when clicking outside
function handleClickOutside(event: Event) {
  const target = event.target as Element
  if (!target.closest('.relative')) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  // Initialize stores
  // cartStore.loadCart()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
