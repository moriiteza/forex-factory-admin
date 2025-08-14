// @ts-ignore
import axiosInstance from '@/composables/axios'

const fetch = async (fitlers: any) => {
  return await axiosInstance.get(`subscription/admin/plans/`, { params: fitlers })
}

const create = async (data: any) => {
  return await axiosInstance.post('subscription/admin/plans/', data)
}

const get = async (id: number) => {
  return await axiosInstance.get(`subscription/admin/plans/${id}/`)
}

const update = async (id: number, data: any) => {
  return await axiosInstance.put(`subscription/admin/plans/${id}/`, data)
}

const remove = async (id: number) => {
  return await axiosInstance.delete(`subscription/admin/plans/${id}/`)
}

export { get, create, fetch, update, remove }
