

<template>
  <header>
    <app-header/>
  </header>
  <main>
    <router-view/>
  </main>
  <footer>
    <app-footer/>
  </footer>
</template>
<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

</script>

<style scoped>

</style>
