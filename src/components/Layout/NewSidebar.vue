<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-vertical-demo shadow shadow-lg p-1 z-3"
    :collapse="isCollapse"
    @open="isCollapse"
    @close="!isCollapse"
    @select="handleSelect"
    menu-trigger="click"
    :router="true"
    :class="{ 'is-mobile-side': isCollapse }"
    :collapse-transition="true"
    :unique-opened="true"
  >
    <div
      class="align-items-center justify-content-start pb-2 ps-2 pe-5 my-3"
      :class="{ 'd-none': isCollapse }"
    >
      <div class="d-block">
        <img src="@/assets/images/LOGO.png" width="60px" height="60px" alt="logo" />
      </div>
    </div>

    <el-menu-item :index="`/`">
      <Icon class="me-2 fs-6" :icon="'material-symbols:home'" width="20"></Icon>
      <template #title> داشبورد</template>
    </el-menu-item>

    <el-menu-item :index="`/users`">
      <Icon class="me-2 fs-6" :icon="'material-symbols:emoji-people'" width="20"></Icon>
      <template #title> کاربران</template>
    </el-menu-item>

    <el-menu-item :index="`/calendar/event`">
      <Icon class="me-2 fs-6" :icon="'material-symbols:event-seat-outline'" width="20"></Icon>
      <template #title> رویداد </template>
    </el-menu-item>

    <el-menu-item :index="`/calendar`">
      <Icon class="me-2 fs-6" :icon="'material-symbols:calendar-month'" width="20"></Icon>
      <template #title> تقویم</template>
    </el-menu-item>

    <el-menu-item :index="`/story`">
      <Icon class="me-2 fs-6" :icon="'material-symbols:history-toggle-off'" width="20"></Icon>
      <template #title> استوری</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

const props = defineProps({
  open: Boolean,
  menu: Array,
})
const route = useRoute()
const router = useRouter()

const isCollapse = ref(false)
const activeIndex = ref(route.name)

watch(
  () => props.open,
  (value: boolean) => {
    isCollapse.value = value
  },
)

const handleSelect = (key: string, keyPath: string[]) => {
  activeIndex.value = key
}

if (window.screen.width <= 600) {
  isCollapse.value = true
}
</script>

<style scoped lang="scss">
:deep(.el-sub-menu .el-sub-menu__icon-arrow) {
  left: 10px;
  right: auto;
}

:deep(.el-menu--inline) {
  margin: 0 !important;
  padding: 0 !important;
}

:deep(.el-sub-menu__title) {
  padding-left: 0 !important;
  padding-right: 20px !important;
}

:deep(.el-menu-item .el-menu-tooltip__trigger) {
  padding-left: 0 !important;
}

@media only screen and (max-width: 600px) {
  .is-mobile-side {
    display: none;
  }
}
</style>
