// @ts-ignore
import axiosInstance from '@/composables/axios'

const fetch = async (filters?: any) => {
  return await axiosInstance.get('user/admin/', { params: filters })
}

const get = async (id: string) => {
  return await axiosInstance.get(`user/admin/${id}/`)
}

const create = async (data: any) => {
  return await axiosInstance.post('user/admin/', data)
}

const update = async (id: number, data: any) => {
  return await axiosInstance.put(`user/admin/${id}/`, data)
}

const remove = async (id: number) => {
  return await axiosInstance.delete(`user/admin/${id}/`)
}

export { fetch, create, update, remove, get }
