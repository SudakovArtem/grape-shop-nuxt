<template>
  <footer class="bg-footer text-white">
    <div class="container mx-auto py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-vine-300 rounded-full flex items-center justify-center text-vine-800 font-bold">
              🍇
            </div>
            <div>
              <h3 class="text-lg font-semibold">Виноградные саженцы</h3>
              <p class="text-vine-300 text-sm">Выращено с любовью</p>
            </div>
          </div>
          <p class="text-vine-200 text-sm">
            Семейный питомник качественных саженцев винограда. Каждое растение выращено с особой заботой в экологически
            чистом районе.
          </p>
          <div class="flex items-center gap-2">
            <span class="text-vine-400">🌿</span>
            <span class="text-vine-300 text-sm">Ограниченные партии</span>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold">Навигация</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/" class="text-vine-200 hover:text-white transition-colors text-sm"> Главная </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/catalog" class="text-vine-200 hover:text-white transition-colors text-sm">
                Каталог саженцев
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/articles" class="text-vine-200 hover:text-white transition-colors text-sm">
                Статьи о виноградарстве
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="text-vine-200 hover:text-white transition-colors text-sm">
                Контакты
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/shipping" class="text-vine-200 hover:text-white transition-colors text-sm">
                Доставка и оплата
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Categories -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold">Популярные категории</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/catalog?color=Красный" class="text-vine-200 hover:text-white transition-colors text-sm">
                Красные сорта
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/catalog?color=Белый" class="text-vine-200 hover:text-white transition-colors text-sm">
                Белые сорта
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/catalog?berryShape=Крупная"
                class="text-vine-200 hover:text-white transition-colors text-sm"
              >
                Крупноплодные
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/catalog?taste=Сладкий" class="text-vine-200 hover:text-white transition-colors text-sm">
                Сладкие сорта
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/catalog?inStock=true" class="text-vine-200 hover:text-white transition-colors text-sm">
                В наличии
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold">Контакты</h4>
          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-vine-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                ></path>
              </svg>
              <div>
                <p class="text-vine-200 text-sm">+7 (999) 123-45-67</p>
                <p class="text-vine-400 text-xs">Пн-Пт: 9:00-18:00</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-vine-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              <p class="text-vine-200 text-sm">info@grapeseedlings.ru</p>
            </div>

            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-vine-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <div>
                <p class="text-vine-200 text-sm">Краснодарский край,</p>
                <p class="text-vine-200 text-sm">ст. Виноградная, ул. Садовая, 15</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-vine-700 mt-8 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="flex items-center gap-6">
            <p class="text-vine-300 text-sm">© 2025 Виноградные саженцы. Все права защищены.</p>
          </div>

          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <span class="text-vine-400">🤲</span>
              <span class="text-vine-300 text-xs">Ручная работа</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-vine-400">🍇</span>
              <span class="text-vine-300 text-xs">Эко-чистота</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Icons replaced with emoji for better compatibility
</script>
