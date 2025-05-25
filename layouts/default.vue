<template>
  <BaseLayout>
    <template #header>
      <LayoutHeader />
    </template>
    <template #content>
      <NuxtPage />
    </template>
    <template #footer>
      <LayoutFooter />
      <AuthDialog />
    </template>
  </BaseLayout>
</template>
