import { numberToFullHex } from '@/utils/hex'

export type ComType = {
  value: number
  name: string
  key: ComTypeKey
  disable: boolean
}

export type ComTypeKey =
  | 'TYPE_CFG'
  | 'TYPE_ZDO_REQ'
  | 'TYPE_ZCL_SEND'
  | 'TYPE_NOTIFY'
  | 'TYPE_ZDO_RSP'
  | 'TYPE_ZCL_IND'
  | 'TYPE_SEND_CNF'

export const comTypeMap: Record<ComTypeKey, ComType> = {
  TYPE_CFG: {
    value: 0x0,
    name: '本地配置命令',
    key: 'TYPE_CFG',
    disable: false
  },
  TYPE_ZDO_REQ: {
    value: 0x1,
    name: '网络管理命令',
    key: 'TYPE_ZDO_REQ',
    disable: false
  },
  TYPE_ZCL_SEND: {
    value: 0x2,
    name: 'ZCL发送命令',
    key: 'TYPE_ZCL_SEND',
    disable: false
  },
  TYPE_NOTIFY: {
    value: 0x80,
    name: '系统通知命令',
    key: 'TYPE_NOTIFY',
    disable: true
  },
  TYPE_ZDO_RSP: {
    value: 0x81,
    name: '网络管理返回',
    key: 'TYPE_ZDO_RSP',
    disable: true
  },
  TYPE_ZCL_IND: {
    value: 0x82,
    name: 'ZCL接收命令',
    key: 'TYPE_ZCL_IND',
    disable: true
  },
  TYPE_SEND_CNF: {
    value: 0x8f,
    name: '发送确认',
    key: 'TYPE_SEND_CNF',
    disable: false
  }
}

export const typeList = (() =>
  Object.values(comTypeMap).map((x) => ({
    label: `${numberToFullHex(x.value)} - (${x.name}-${x.key})`,
    value: x.value,
    disable: x.disable
  })))()
