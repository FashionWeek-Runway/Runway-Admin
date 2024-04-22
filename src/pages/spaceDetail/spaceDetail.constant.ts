export interface IInputItem {
  type:
    | 'text'
    | 'number'
    | 'url'
    | 'tel'
    | 'textarea'
    | 'timePicker'
    | 'toggle'
    | 'checkbox'
    | 'floor'
    | 'keyword'
    | 'map'
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
  placeName: {
    type: 'text',
    name: 'placeName',
    label: '공간 상호명',
    maxLength: 20,
    placeholder: '20자 이내',
  },
  placeUrl: {
    type: 'url',
    name: 'placeUrl',
    label: 'sns 링크',
    placeholder: 'ex) 인스타그램, 자체사이트',
  },
  placeCategory: {
    type: 'text',
    name: 'placeCategory',
    label: '유형',
    placeholder: 'ex) 칵테일바',
  },
  placeCost: {
    type: 'text',
    name: 'placeCost',
    label: '대여 금액',
  },
  placeMinReserveDate: {
    type: 'number',
    name: 'placeMinReserveDate',
    label: '최소 예약가능 일수',
  },
  placeOperationHour: {
    type: 'timePicker',
    name: 'placeOperationHour',
    label: '영업시간',
  },
  placeAddress: {
    type: 'text',
    name: 'placeAddress',
    label: '지역',
  },
  placeLocation: {
    type: 'map',
    name: 'placeLocation',
    label: '위치',
  },
  placeNearbyInfo: {
    type: 'text',
    name: 'placeNearbyInfo',
    label: '주변정보',
  },
  placeFootTraffic: {
    type: 'text',
    name: 'placeFootTraffic',
    label: '유동인구',
  },
  placeConcept: {
    type: 'text',
    name: 'placeConcept',
    label: '공간 컨셉',
    maxLength: 30,
  },
  placeExplain: {
    type: 'textarea',
    size: 'm',
    name: 'placeExplain',
    label: '공간 설명',
  },
  placeInfo: {
    type: 'textarea',
    size: 'l',
    name: 'placeInfo',
    label: '공간 소개글',
    maxLength: 1000,
  },
  placeFloor: {
    type: 'floor',
    name: 'placeFloor',
    label: '층수',
    placeholder: '지하: 앞에 B',
  },
  a3CanvasCount: {
    type: 'number',
    name: 'a3CanvasCount',
    label: 'A3 캔버스',
  },
  pcanvasCount: {
    type: 'number',
    name: 'pcanvasCount',
    label: 'P1 캔버스',
  },
  isElevatorExistence: {
    type: 'toggle',
    name: 'isElevatorExistence',
    label: '엘레베이터 유/무',
  },
  isParkingLotExistence: {
    type: 'toggle',
    name: 'isParkingLotExistence',
    label: '주차장 유/무',
  },
  placeKeywordList: {
    type: 'keyword',
    name: 'placeKeywordList',
    label: '공간 키워드',
  },
  placeCaution: {
    type: 'textarea',
    name: 'placeCaution',
    size: 'm',
    label: '주의사항',
  },
  placeRefundPolicy: {
    type: 'textarea',
    size: 'm',
    name: 'placeRefundPolicy',
    label: '환불규정',
  },
  display: {
    type: 'checkbox',
    name: 'display',
    label: '노출 여부',
  },
}

export const RIGHT_SECTION_INPUTS = ['placeKeywordList', 'placeCaution', 'placeRefundPolicy']

export const LEFT_SECTION_INPUTS = [
  'placeName',
  'placeUrl',
  'placeCategory',
  'placeCost',
  'placeMinReserveDate',
  'placeOperationHour',
  'placeAddress',
  'placeLocation',
  'placeNearbyInfo',
  'placeFootTraffic',
  'placeConcept',
  'placeExplain',
  'placeInfo',
]

export const SPACE_OPTION_INPUTS = [
  'placeFloor',
  'a3CanvasCount',
  'pcanvasCount',
  'isElevatorExistence',
  'isParkingLotExistence',
  'display',
]
