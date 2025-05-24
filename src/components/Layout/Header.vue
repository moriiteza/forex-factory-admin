<template>
  <el-header class="pe-4 shadow shadow-lg d-flex">
    <div class="col-md-3 d-flex align-items-center">
      <div class="ms-2" style="cursor: pointer">
        <icon
          icon="lucide:list-x"
          class="fs-1 ms-3"
          @click="openCloseSideBar"
          v-if="!closeSideBar"
        ></icon>
        <icon
          icon="fluent:list-16-filled"
          class="fs-1 ms-3"
          @click="openCloseSideBar"
          v-if="closeSideBar"
        ></icon>
      </div>
    </div>
    <div class="col-md-9 col-11 d-flex align-items-center justify-content-end px-2">
      <el-button type="primary" plain @click="handleThemeChange">
        <Icon
          :icon="themeStore.isDark ? 'material-symbols:dark-mode' : 'material-symbols:light-mode'"
          width="20"
          class="me-2"
        />
        {{ themeStore.isDark ? 'حالت شب' : 'حالت روز' }}
      </el-button>

      <div class="mx-5 app-time">
        <Icon icon="solar:calendar-broken" width="20" class="me-2" />
        {{ formatters.toJalaliDate(time) }}
      </div>

      <div>
        <el-tooltip content="خروج">
          <Icon
            icon="fluent:arrow-exit-20-filled"
            :horizontalFlip="true"
            color="red"
            @click="exit"
            width="28"
          />
        </el-tooltip>
      </div>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import moment from 'moment'
import { ref, watchEffect } from 'vue'
import { ElMessageBox } from 'element-plus'
import { Icon } from '@iconify/vue'
import formatters from '../../libarary/formatters'
import { useThemeStore } from '@/stores/theme'
import { useAuthStore } from '@/stores/auth.ts'

const router = useRouter()
const themeStore = useThemeStore()
const authStore = useAuthStore()

const emits = defineEmits(['sidebarChange'])

const closeSideBar = ref(false)
const time = ref(moment(new Date()).format('HH:mm YYYY-MM-DD'))

const openCloseSideBar = () => {
  closeSideBar.value = !closeSideBar.value
  emits('sidebarChange', closeSideBar.value)
}

const exit = () => {
  ElMessageBox.confirm('آیا می خواهید از برنامه خارج شوید؟', 'خروج از برنامه', {
    confirmButtonText: 'خروج',
    cancelButtonText: 'انصراف',
    type: 'warning',
  }).then(() => {
    authStore.logout()
    router.push('/login')
  })
}

const handleThemeChange = () => {
  themeStore.toggleTheme()
}
</script>

<style scoped lang="scss">
.forgot-badge {
  :deep(sup) {
    background-color: #898989;
  }
}

.incomplete-badge {
  :deep(sup) {
    background-color: #ff0000;
  }
}

.withoutTask-badge {
  :deep(sup) {
    background-color: #1a73e8;
  }
}

.followUpTask-badge {
  :deep(sup) {
    background-color: #fd9a13;
  }
}

.logOut-btn {
  cursor: pointer;
  float: left;
  color: red;
  margin-left: 10pt;
}

.app-time {
  direction: rtl;
  text-align: center;
  font-size: 14px;
  color: #6c757d;
  line-height: 30px;
  border: 1px solid #c2c2c2;
  padding: 0 5px;
  border-radius: 4px;
  font-weight: 400;
}
</style>
