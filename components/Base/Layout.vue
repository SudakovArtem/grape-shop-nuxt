<script lang="ts" setup></script>

<template>
  <div class="flex min-h-screen flex-col">
    <header>
      <slot name="header" />
    </header>
    <main class="relative flex-auto">
      <slot name="content" />
    </main>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped></style>
