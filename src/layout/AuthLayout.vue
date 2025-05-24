<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="auth-container">
    <RouterView />
  </div>
</template>

<style lang="scss">
.auth-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(../assets/images/InfoPattern.svg) repeat;
}
</style>
