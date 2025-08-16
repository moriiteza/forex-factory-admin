import { createPinia } from 'pinia'
import { createApp } from 'vue'
import piniaPersist from 'pinia-plugin-persistedstate'
import CKEditor from '@ckeditor/ckeditor5-vue'
import App from './App.vue'
import router from '@/router'
import ElementPlus from 'element-plus'
import './assets/styles/main.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersist)

app.use(CKEditor);
app.use(pinia)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
