// @ts-ignore
import axiosInstance from '@/composables/axios'

const get = async () => {
  return await axiosInstance.get(`setting/admin/ads/`)
}

const create = async (data: any) => {
  return await axiosInstance.post('setting/admin/ads/', data)
}

export { get, create }
