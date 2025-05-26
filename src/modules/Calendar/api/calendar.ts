// @ts-ignore
import axiosInstance from '@/composables/axios'

const fetch = async (filters?: any) => {
  return await axiosInstance.get('calendars/admin/', { params: filters })
}

const get = async (id: string) => {
  return await axiosInstance.get(`calendars/admin/${id}/`)
}

const create = async (data: any) => {
  return await axiosInstance.post('calendars/admin/', data)
}

const update = async (id: number, data: any) => {
  return await axiosInstance.put(`calendars/admin/${id}/`, data)
}

const remove = async (id: number) => {
  return await axiosInstance.delete(`calendars/admin/${id}/`)
}

export { fetch, create, update, remove, get }
