// @ts-ignore
import axiosInstance from '@/composables/axios'

const get = async () => {
  return await axiosInstance.get(`setting/admin/ads/`)
}

const create = async (data: any) => {
  return await axiosInstance.post('setting/admin/ads/', data)
}


const removeFile = async (imageName: string) => {
  return await axiosInstance.delete(`storage/delete/?file_name=${imageName}`)
}

export { get, create, removeFile }
