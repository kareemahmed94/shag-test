<template>
  <div>
    <main-layout>
      <slot></slot>

    </main-layout>
  </div>
</template>
<script>
/* eslint-disable */
import MainLayout from '@/pages/layouts/Main.vue'

  export default {
    name: 'Header',
    components: {
      MainLayout,
    },
  }
</script>
<style scoped>

</style>
