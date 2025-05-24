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
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  align-items: center;
  background: url(../assets/images/InfoPattern.svg) repeat;
}
</style>
