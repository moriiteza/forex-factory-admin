export interface FilterBuilderInterface {
  name: string
  title: string
  type:
    | 'textField'
    | 'userSelectField'
    | 'userLevelSelectField'
    | 'select'
    | 'date'
    | 'userStatusSelect'
    | 'enumSelect'
    | 'persianDate'
    | 'sourceType'
    | 'eventSelect'
  options?: FilterBuilderOptions[] // for type "SELECT"
  filterAble?: Boolean // for type "SELECT"
  remoteFilterAble?: Boolean // for type "SELECT"
  enum?: string // campaign for type "enumSelect"
  icon?: Boolean
  multiple?: Boolean // multiple for type "select types"
}

export interface FilterBuilderOptions {
  name: string
  value: any
}
