export interface IInputItem {
  type: 'text' | 'number' | 'textarea' | 'timePicker' | 'searchKeyword' | 'keyword' | 'regularSelect' | 'kindSelect'
  name: string
  label: string
  maxLength?: number
  max?: number
  note?: string
  placeholder?: string
  size?: 'm' | 'l'
}

interface IInputs {
  [key: string]: IInputItem
}

export const INPUTS: IInputs = {
  projectName: {
    type: 'text',
    name: 'projectName',
    label: '프로젝트 이름',
    maxLength: 20,
    placeholder: '20자 이내',
  },
  usages: {
    type: 'text',
    name: 'usages',
    label: '사용처',
    placeholder: 'ex) TBT',
  },
  detail: {
    type: 'text',
    name: 'detail',
    label: '프로젝트 설명',
    placeholder: '프로젝트 설명이 들어갑니다.',
  },
  searchKeyword: {
    type: 'text',
    name: 'searchKeyword',
    size: 'm',
    label: '검색 키워드',
    placeholder: '사용자가 검색시 해당 검색어가 포함되어 검색됩니다,',
  },
  donationDate: {
    type: 'timePicker',
    name: 'donationDate',
    label: '기부 기간',
  },
  regularStatus: {
    type: 'regularSelect',
    name: 'regularStatus',
    label: '기부 종류',
  },
  projectKind: {
    type: 'kindSelect',
    name: 'projectKind',
    label: '후원 분야',
  },
}

export const RIGHT_SECTION_INPUTS = ['searchKeyword']

export const LEFT_SECTION_INPUTS = ['projectName', 'usages', 'detail', 'donationDate', 'regularStatus', 'projectKind']
