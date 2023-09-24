import { numberToFullHex } from '@/utils/hex'
import { comTypeMap, ComTypeKey } from './comType'

export type ComCode = {
  value: number
  name: string
  key: string
}

export const comCodeMap: Record<ComTypeKey, Record<string, ComCode>> = {
  TYPE_CFG: {
    CFG_STATUS: {
      value: 0x0,
      name: '查询模组当前状态',
      key: 'CFG_STATUS'
    },
    CFG_OPEN_NET: {
      value: 0x2,
      name: '开始配网',
      key: 'CFG_OPEN_NET'
    },
    CFG_EZ_MODE: {
      value: 0x28,
      name: '检测节点入网',
      key: 'CFG_EZ_MODE'
    }
  },
  TYPE_ZDO_REQ: {
    ZDO_GET_PORT: {
      value: 0x5,
      name: '查询节点端口数',
      key: 'ZDO_ACTIVE_EP_REQ'
    },
    ZDO_GET_BIND: {
      value: 0x33,
      name: '查看节点常连接绑定',
      key: 'ZDO_GET_BIND'
    }
  },
  TYPE_ZCL_SEND: {},
  TYPE_NOTIFY: {
    NOTIFY_NODE_JOIN: {
      value: 0x3,
      name: '检测节点入网',
      key: 'NOTIFY_NODE_JOIN'
    }
  },
  TYPE_ZDO_RSP: {
    ZDO_ACTIVE_EP_RSP: {
      value: 0x5,
      name: '查询节点端口数',
      key: 'ZDO_ACTIVE_EP_RSP'
    }
  },
  TYPE_ZCL_IND: {},
  TYPE_SEND_CNF: {}
}

export const typeValueCodeMap = (() => {
  const map = {} as Record<number, { label: string; value: number }[]>
  Object.values(comTypeMap).forEach((type) => {
    map[type.value] = Object.values(comCodeMap[type.key]).map((x) => ({
      label: `${numberToFullHex(x.value)}-${x.name}`,
      value: x.value
    }))
  })
})()
