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
            <UiBreadcrumbLink href="/shipping"> Доставка и оплата </UiBreadcrumbLink>
          </UiBreadcrumbItem>
        </UiBreadcrumbList>
      </UiBreadcrumb>

      <div class="mb-8">
        <h1 class="text-3xl font-bold text-vine-800 mb-4">Доставка и оплата</h1>
        <p class="text-vine-600">Информация о способах доставки и оплаты заказов</p>
      </div>

      <div class="space-y-8">
        <!-- Delivery Methods -->
        <UiCard class="p-6">
          <h2 class="text-2xl font-semibold text-vine-800 mb-6">Способы доставки</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Pickup -->
            <div class="border border-vine-200 rounded-lg p-4">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 bg-vine-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-vine-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-vine-800">Самовывоз</h3>
                  <span class="text-green-600 font-medium">Бесплатно</span>
                </div>
              </div>
              <ul class="text-sm text-vine-600 space-y-1">
                <li>• Забрать заказ в питомнике</li>
                <li>• По предварительной договоренности</li>
                <li>• Возможность выбрать саженцы лично</li>
                <li>• Консультация специалиста</li>
              </ul>
            </div>

            <!-- Delivery -->
            <div class="border border-vine-200 rounded-lg p-4">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 bg-vine-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-vine-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                    ></path>
                    <path
                      d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707L16 7.586A1 1 0 0015.414 7H14z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-vine-800">Доставка курьером</h3>
                  <span class="text-vine-600 font-medium">500 ₽</span>
                </div>
              </div>
              <ul class="text-sm text-vine-600 space-y-1">
                <li>• Доставка по Краснодарскому краю</li>
                <li>• Срок доставки: 2-3 дня</li>
                <li>• Время доставки: 9:00-18:00</li>
                <li>• Уведомление о доставке по SMS</li>
              </ul>
            </div>
          </div>

          <div class="mt-6 p-4 bg-vine-50 rounded-lg">
            <h4 class="font-medium text-vine-800 mb-2">Важная информация:</h4>
            <ul class="text-sm text-vine-600 space-y-1">
              <li>• Саженцы упаковываются с особой тщательностью для сохранения корневой системы</li>
              <li>• При получении обязательно проверьте целостность упаковки</li>
              <li>• Рекомендуем высаживать саженцы в течение 3 дней после получения</li>
            </ul>
          </div>
        </UiCard>

        <!-- Delivery Timeline -->
        <UiCard class="p-6">
          <h2 class="text-2xl font-semibold text-vine-800 mb-6">Сроки доставки</h2>

          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <div
                class="w-8 h-8 bg-vine-600 text-accent rounded-full flex items-center justify-center text-sm font-bold"
              >
                1
              </div>
              <div>
                <h4 class="font-medium text-vine-800">Обработка заказа</h4>
                <p class="text-sm text-vine-600">В течение 1-2 рабочих дней</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div
                class="w-8 h-8 bg-vine-600 text-accent rounded-full flex items-center justify-center text-sm font-bold"
              >
                2
              </div>
              <div>
                <h4 class="font-medium text-vine-800">Подготовка к отправке</h4>
                <p class="text-sm text-vine-600">Упаковка саженцев, проверка качества</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div
                class="w-8 h-8 bg-vine-600 text-accent rounded-full flex items-center justify-center text-sm font-bold"
              >
                3
              </div>
              <div>
                <h4 class="font-medium text-vine-800">Доставка</h4>
                <p class="text-sm text-vine-600">2-3 рабочих дня по Краснодарскому краю</p>
              </div>
            </div>
          </div>
        </UiCard>

        <!-- Payment Methods -->
        <UiCard class="p-6">
          <h2 class="text-2xl font-semibold text-vine-800 mb-6">Способы оплаты</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="border border-vine-200 rounded-lg p-4 text-center">
              <div class="w-12 h-12 bg-vine-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-vine-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"></path>
                </svg>
              </div>
              <h4 class="font-medium text-vine-800 mb-1">Банковская карта</h4>
              <p class="text-sm text-vine-600">Visa, MasterCard, МИР</p>
            </div>

            <div class="border border-vine-200 rounded-lg p-4 text-center">
              <div class="w-12 h-12 bg-vine-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-vine-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"></path>
                </svg>
              </div>
              <h4 class="font-medium text-vine-800 mb-1">Онлайн-банк</h4>
              <p class="text-sm text-vine-600">Сбербанк Онлайн, ВТБ</p>
            </div>

            <div class="border border-vine-200 rounded-lg p-4 text-center">
              <div class="w-12 h-12 bg-vine-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-vine-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"></path>
                </svg>
              </div>
              <h4 class="font-medium text-vine-800 mb-1">При получении</h4>
              <p class="text-sm text-vine-600">Наличными или картой</p>
            </div>
          </div>

          <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div class="flex items-start gap-2">
              <svg class="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <div>
                <p class="text-sm text-yellow-800">
                  <strong>Обратите внимание:</strong> Оплата при получении возможна только при доставке. При самовывозе
                  оплата производится на месте.
                </p>
              </div>
            </div>
          </div>
        </UiCard>

        <!-- Terms and Conditions -->
        <UiCard class="p-6">
          <h2 class="text-2xl font-semibold text-vine-800 mb-6">Условия возврата</h2>

          <div class="prose prose-vine max-w-none">
            <p>
              Мы гарантируем качество наших саженцев и готовы заменить растение в случае, если оно не приживется при
              соблюдении правил посадки и ухода.
            </p>

            <h4 class="text-lg font-semibold text-vine-800 mt-4 mb-2">Условия гарантии:</h4>
            <ul class="space-y-1">
              <li>• Гарантия действует 30 дней с момента получения саженца</li>
              <li>• Требуется соблюдение рекомендаций по посадке и уходу</li>
              <li>• Сохранение упаковки и документов</li>
              <li>• Фотоподтверждение состояния растения</li>
            </ul>

            <div class="mt-6 p-4 bg-vine-50 rounded-lg">
              <h4 class="font-medium text-vine-800 mb-2">Для получения гарантийной замены:</h4>
              <ol class="space-y-1">
                <li>1. Свяжитесь с нами по телефону или email</li>
                <li>2. Предоставьте фото саженца и описание проблемы</li>
                <li>3. Мы рассмотрим обращение в течение 3 рабочих дней</li>
                <li>4. При подтверждении гарантийного случая предоставим замену</li>
              </ol>
            </div>
          </div>
        </UiCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO
useHead({
  title: 'Доставка и оплата - Саженцы винограда',
  meta: [
    {
      name: 'description',
      content:
        'Информация о доставке саженцев винограда: самовывоз, курьерская доставка, способы оплаты, сроки и условия возврата.'
    }
  ]
})
</script>
