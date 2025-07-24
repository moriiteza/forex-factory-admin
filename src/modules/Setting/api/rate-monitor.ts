// @ts-ignore
import axiosInstance from '@/composables/axios'

const get = async () => {
  return await axiosInstance.get(`rate-monitor/asset/admin/price/`)
}

const create = async (data: any) => {
  return await axiosInstance.post('rate-monitor/asset/admin/price/', data)
}

export { get, create }
