// @ts-ignore
import axiosInstance from '@/composables/axios'

const fetch = async (filters?: any) => {
  return await axiosInstance.get('story/admin/', { params: filters })
}

const get = async (id: string) => {
  return await axiosInstance.get(`story/admin/${id}/`)
}

const create = async (data: any) => {
  return await axiosInstance.post('story/admin/', data)
}

const update = async (id: number, data: any) => {
  return await axiosInstance.put(`story/admin/${id}/`, data)
}

const remove = async (id: number) => {
  return await axiosInstance.delete(`story/admin/${id}/`)
}

export { fetch, create, update, remove, get }
