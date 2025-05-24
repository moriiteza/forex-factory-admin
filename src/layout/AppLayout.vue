<template>
  <el-container class="main-container justify-content-center">
    <NewSidebar :open="closeSideBar" />
    <div class="row w-100">
      <Header @sidebar-change="changeSideBar" />
      <div class="container app-container">
        <router-view />
      </div>
    </div>
  </el-container>
</template>

<script setup lang="ts">
import Header from '../components/Layout/Header.vue'
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import NewSidebar from '@/components/Layout/NewSidebar.vue'

const closeSideBar = ref(false)
const changeSideBar = (event: boolean) => {
  closeSideBar.value = event
}
</script>

<style scoped>
.main-container {
  min-height: 100vh;
}

* {
  overflow: hidden;
}

@media only screen and (max-width: 600px) {
  .app-container {
    padding: 1rem !important;
    max-width: 100%;
    min-width: 100%;
  }
}
</style>
