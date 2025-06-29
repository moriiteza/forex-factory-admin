import { useAuthStore } from '@/stores/auth'
import axios from 'axios'
import router from '@/router'
import { ElMessage } from 'element-plus'

export const baseurl = 'https://api.stage.forexfactory.live/api';

// Base API URL (Change to your backend URL)
const api = axios.create({
  baseURL: baseurl,
  headers: { 'Content-Type': 'application/json' },
})

// **🚀 Attach JWT Token to Requests**
api.interceptors.request.use(
  (config) => {
    const auth = useAuthStore()
    if (auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`
    }
    return config
  },
  (error) => {
    ElMessage.error('خطا در ارسال درخواست. دوباره تلاش کنید')
    return Promise.reject(error)
  },
)

// **🚨 Handle Errors in Responses**
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status
    const detail = error.response?.data?.detail

    if (status === 401) {
      const auth = useAuthStore()
      auth.logout()
      router.push('/login')
      ElMessage.error('نشست شما به پایان رسیده است، مجددا وارد شوید')
    } else if (status === 403) {
      ElMessage.error('دسترسی شما تایید نشد')
    } else if (status === 404) {
      ElMessage.error('درخواست مورد نظر یافت نشد، با پشتیبانی تماس حاصل فرمایید')
    } else if (status >= 500) {
      ElMessage.error('خطای داخلی سرور، با پشتیبانی تماس حاصل فرمایید')
    } else if (detail) {
      ElMessage.error(detail)
    } else {
      ElMessage.error('یک خطای نامشخص رخ داده است')
    }

    return Promise.reject(error)
  },
)

export default api
