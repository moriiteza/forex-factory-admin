// @ts-ignore
import axiosInstance from '@/composables/axios'

const get = async () => {
  return await axiosInstance.get(`setting/admin/tutorial/JOURNAL_TUTORIAL/`)
}

const create = async (data: any) => {
  return await axiosInstance.post('setting/admin/tutorial/JOURNAL_TUTORIAL/', data)
}

export { get, create }
