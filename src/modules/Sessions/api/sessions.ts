// @ts-ignore
import axiosInstance from '@/composables/axios'

const fetch = async (filters?: any) => {
  return await axiosInstance.get('calendars/admin/session/', { params: filters })
}

const get = async (id: string) => {
  return await axiosInstance.get(`calendars/admin/session/${id}/`)
}

const create = async (data: any) => {
  return await axiosInstance.post('calendars/admin/session/', data)
}

const update = async (id: number, data: any) => {
  return await axiosInstance.put(`calendars/admin/session/${id}/`, data)
}

const remove = async (id: number) => {
  return await axiosInstance.delete(`calendars/admin/session/${id}/`)
}

export { fetch, create, update, remove, get }
