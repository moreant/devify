import { numberToFullHex } from '@/utils/hex'

export interface ZclCommon {
  snedMode: 0x40 | 0x80
  shortAddr: number
  endpoint: number
  frameNum: number
  commDirect: 0 | 1
  cluster: number
  compCode: number
  respMode: 0 | 1 | 2
}

export const sendModeMap: Record<ZclCommon['snedMode'], string> = {
  0x40: 'APS加密',
  0x80: '强行发送'
}

const mapToOpt = (map: Record<number, string>) =>
  Object.entries(map).map(([key, value]) => {
    const n = Number(key)
    return {
      label: `${numberToFullHex(n)} - ${value}`,
      value: n
    }
  })

export const sendModeMapOpt = (() => mapToOpt(sendModeMap))()

export const commDirectMap: Record<ZclCommon['commDirect'], string> = {
  0: 'C2S',
  1: 'S2C'
}

export const commDirectOpt = (() => mapToOpt(commDirectMap))()

export const respModeMap: Record<ZclCommon['respMode'], string> = {
  0: 'Default Response',
  1: 'APS Ack',
  2: '不作任何应答'
}

export const respModeOpt = (() => mapToOpt(respModeMap))()
