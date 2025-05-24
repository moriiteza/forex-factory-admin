import axiosInstance from '@/composables/axios'

export default {
  imageLink: async (value: string | number) => {
    return await axiosInstance.get(`file-upload/download?fileName=${value}`)
  },

  price: (value: string | number) => {
    const reverse = (val: any) => (val || 0).toString().split('').reverse().join('')
    return reverse(reverse(value).replace(/(\d{3})(?=\d)/g, '$1,'))
  },

  roundBy: (number: any, factor: any) => {
    return Math.floor(number / factor) * factor
  },

  addRial: (value: string | number) => {
    return `<div>${
      String(value).includes('-') ? String(value).split('-')[1] + ' - ' : String(value)
    } <span style='color:#a8a8a8;font-size: 12px'>ریال</span></div>`
  },

  makeBold: (value: any) => {
    return value ? `<span style='font-weight: bold'>${value}</span>` : ''
  },

  elTagComponent: (value: string, type: string = 'info') => {
    return `<span style="display: flex; justify-content: center; align-items: center; width: fit-content; margin: auto;padding: 15px"  class="el-tag el-tag--${type}">${value}</span>`
  },

  toJalali: (value: string) => {
    const date = new Date(value).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    })
    return date
  },

  toJalaliDate: (value: string) => {
    return new Date(value).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
  },

  elTagArrayComponent: (value: [], type: string = 'info', keyName: string) => {
    let result = ''
    for (const val of value) {
      result += `<span style='display: flex; justify-content: center; align-items: center; width: fit-content; padding: 15px; margin: 5px auto auto;'  class='el-tag el-tag--${type}'>${val[keyName]}</span>`
    }
    return result
  },
  filterObjectFields: (value: Record<string, any>): Record<string, any> => {
    let result: Record<string, any> = {}

    // Iterate over all the entries in the object
    for (const [key, val] of Object.entries(value)) {
      // Check if the value is not empty (null, undefined, or empty string)
      if (val !== null && val !== undefined && val !== '') {
        result[key] = val // Only include non-empty values
      }
    }

    return result // Return the filtered object
  },
}
