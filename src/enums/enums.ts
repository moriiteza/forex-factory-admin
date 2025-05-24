export default {
  bool: {
    true: 'بله',
    false: 'خیر',
  },
  boolNumber: {
    1: 'بله',
    0: 'خیر',
  },
  calendarType: {
    'metal': 'فلزات',
    'crypto': 'کریپتو',
    'energy': 'انرژی',
    'forex': 'فارکس',
  },
  getEnumArray(enumItem: string, start = 1) {
    const result = []
    let index = start
    // @ts-ignore
    enumItem = this[enumItem]
    // @ts-ignore
    for (const key in enumItem) {
      if (!enumItem.hasOwnProperty(key)) continue
      result.push({
        name: enumItem[key],
        value: key,
      })
      index++
    }
    return result
  },
  getById(enumItem: string, value: string) {
    if (enumItem === 'bool' || enumItem === 'marital' || enumItem === 'local') {
      value = value.toString()
    }
    const array = this.getEnumArray(enumItem)
    return array?.find((e: any) => e.value === value)?.name || {}
  },
}
