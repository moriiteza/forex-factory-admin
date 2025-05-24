export interface FilterBuilderInterface {
    name: string;
    title: string;
    type: 'textField' | 'userSelectField' | 'userLevelSelectField' | 'select' | 'date' | 'userStatusSelect' | 'enumSelect';
    options?: FilterBuilderOptions[] // for type "SELECT"
    filterAble?: Boolean // for type "SELECT"
    remoteFilterAble?: Boolean // for type "SELECT"
    enum?: string // campaign for type "enumSelect"
    icon?: Boolean,
}

export interface FilterBuilderOptions {
    name: string;
    value: any;
}