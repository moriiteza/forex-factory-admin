import type { Component } from 'vue'

export interface TableColumnInterFace {
  title: string;
  key: string;
  width?: string;
  sortable: boolean;
  type: 'text' | 'date' | 'originalDate' | 'tag' | 'custom' | 'operation' | 'component' | 'tagDate' | 'lastContact' | 'button' | 'image' | 'enum' | 'formatter' | 'boolean' | 'price',
  tagType?: 'success' | 'info' | 'warning' | 'danger' | 'primary' | '', // for "TAG" type
  operations?: TableOperation[],
  html?: Function // for "custom" type, it should be a function that get a val in return all row, for example: html: (val: any) => {},
  component?: Component,
  propName?: string,
  emitName?: string
  tagMode?: boolean //put the date string in tag element by value true and false
  buttonColor?: 'success' | 'info' | 'warning' | 'danger' | 'primary' | '', // for "BUTTON" type
  onClick?: Function, // it returns a function with row like this: onClick: ({ row }) => {}, it use in "BUTTON" type
  formatter?: Function,
}

export interface TableOperation {
  icon: string,
  tooltip: string;
  iconColor: 'success' | 'info' | 'warning' | 'danger' | 'primary' | 'error' | 'none',
  onClick?: Function, // it returns a function with row like this: onClick: ({ row }) => {}
}