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
                v-if="totalItems > 0"
                class="absolute -top-2 -right-2 bg-vine-600 text-accent text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {{ totalItems }}
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
            <UiDropdownMenuContent>
              <UiDropdownMenuItem @click="colorMode.preference = 'light'"> Light </UiDropdownMenuItem>
              <UiDropdownMenuItem @click="colorMode.preference = 'dark'"> Dark </UiDropdownMenuItem>
              <UiDropdownMenuItem @click="colorMode.preference = 'system'"> System </UiDropdownMenuItem>
            </UiDropdownMenuContent>
          </UiDropdownMenu>

          <!-- User Menu -->
          <div class="relative">
            <UiButton v-if="!isAuth" @click="openModal('login')" variant="outline" size="sm"> Войти </UiButton>
            <UiDropdownMenu v-else>
              <UiDropdownMenuTrigger as-child>
                <UiButton variant="ghost" size="sm" class="flex items-center gap-2">
                  <UiAvatar>
                    <UiAvatarImage v-if="user?.avatar" :src="user.avatar" alt="@unovue" />
                    <UiAvatarFallback>
                      <Icon name="i-lucide-user-round" class="size-5" />
                    </UiAvatarFallback>
                  </UiAvatar>
                  <span class="hidden sm:inline">{{ user?.name || 'Профиль' }}</span>
                  <Icon name="i-lucide-chevron-down" class="w-4 h-4" />
                </UiButton>
              </UiDropdownMenuTrigger>
              <UiDropdownMenuContent align="end">
                <UiDropdownMenuItem as-child>
                  <NuxtLink to="/profile" class="flex items-center">
                    <Icon name="i-lucide-user" class="w-4 h-4 mr-2" />
                    Личный кабинет
                  </NuxtLink>
                </UiDropdownMenuItem>
                <UiDropdownMenuItem @click="logout">
                  <Icon name="i-lucide-log-out" class="w-4 h-4 mr-2" />
                  Выйти
                </UiDropdownMenuItem>
              </UiDropdownMenuContent>
            </UiDropdownMenu>
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
import useUserStore from '@/stores/user'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'

const colorMode = useColorMode()
const authStore = useAuthStore()
const { openModal } = authStore
const { isAuth } = storeToRefs(authStore)
const { totalItems } = storeToRefs(useCartStore())
const router = useRouter()
const { user } = storeToRefs(useUserStore())
const { user: userService } = useServices()

const searchQuery = ref('')
const showMobileMenu = ref(false)

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
  router.push('/')
  userService.logout()
}

</script>
