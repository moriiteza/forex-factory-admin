// @ts-ignore
import axiosInstance from '@/composables/axios'

const fetch = async (filters?: any) => {
  return await axiosInstance.get('story/admin/category/', { params: filters })
}

const get = async (id: string) => {
  return await axiosInstance.get(`story/admin/category/${id}/`)
}

const create = async (data: any) => {
  return await axiosInstance.post('story/admin/category/', data)
}

const update = async (id: number, data: any) => {
  return await axiosInstance.put(`story/admin/category/${id}/`, data)
}

const remove = async (id: number) => {
  return await axiosInstance.delete(`story/admin/category/${id}/`)
}

export { fetch, create, update, remove, get }
