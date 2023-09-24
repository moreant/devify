import { toStr } from '@/utils/EByte-Zigbee'

export const AttributesMap = {
  macAddr: {
    name: 'MAC 地址',
    format: (data: Uint8Array) => toStr(data.subarray(0, 8))
  },
  shortAddr: {
    name: '短地址',
    format: (data: Uint8Array) => toStr(data.subarray(0, 2))
  },
  deviceType: {
    name: '设备类型',
    format: (data: Uint8Array) => {
      const type = data[0]
      const devTypeStr = type === 0 ? '协调器' : type === 1 ? '路由器' : '终端节点'
      return `${type}(${devTypeStr})`
    }
  },
  netStatus: {
    name: '网络状态',
    format: (data: Uint8Array) => {
      const status = data[0]
      const statusStr = status === 0 ? '已组网' : '未组网'
      return `${status}(${statusStr})`
    }
  }
}
