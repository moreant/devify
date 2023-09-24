import { Buffer } from 'buffer'
import { typeList } from './Ebyte/Zigbee'
import { numberToFullHex } from './hex'
import { DataTypeMap } from './Ebyte/Zigbee/dataType'

const chk8xor = (byteArray: Buffer) => {
  let checksum = 0
  for (let i = 0; i < byteArray.length; i++) {
    checksum ^= byteArray[i]
  }
  return checksum
}

type UBuffer = Buffer | Uint8Array

const calculator = ({
  type,
  code,
  data
}: {
  type: number
  code: number
  data: number[] | Buffer
}) => {
  const params = Buffer.from([type, code, ...data])

  const check = chk8xor(params)

  const length = params.length + 1

  const header = Buffer.from([0x55, length])

  return Buffer.concat([header, params, Buffer.from([check])])
}

const toStr = (buffer: UBuffer, split?: string) => {
  const str = buffer.toString('hex').toUpperCase().trim()
  if (split === undefined) {
    split = ' '
  }
  const resList = []
  for (let i = 0; i < str.length; i += 2) {
    resList.push(str.substring(i, i + 2))
  }
  return resList.join(split)
}

type Options = {
  label: string
  value: number
  disabled?: boolean
}[]

const codeList: Record<string, Options> = {
  0: [
    {
      label: '0x00-查询模组当前状态',
      value: 0
    },
    {
      label: '0x02-开始配网',
      value: 2
    },
    {
      label: '0x10-自动绑定目标',
      value: 0x10,
      disabled: true
    },
    {
      label: '0x22-读取入网节点地址表',
      value: 0x22
    },
    {
      label: '0x28-重传设备信息通知',
      value: 0x28
    }
  ],
  1: [
    {
      label: '0x05-查询节点端口数',
      value: 0x05
    },
    {
      label: '0x33-查看节点常连接绑定',
      value: 0x33
    }
  ],
  2: [
    {
      label: '0x01-设置属性',
      value: 0x01
    },
    {
      label: '0x0F-发送控制命令',
      value: 0x0f
    }
  ],
  0x80: [
    {
      label: '0x03检测节点入网',
      value: 0x03
    },
    {
      label: '0x04节点短地址通知',
      value: 0x04
    },
    {
      label: '0x05设备信息通知',
      value: 0x05
    }
  ],
  0x81: [
    {
      label: '0x05-查询节点端口数',
      value: 0x05
    }
  ],
  0x82: [
    {
      label: '0x0A-收到属性主动上报',
      value: 0x0a
    }
  ]
}

const parseFun: Record<
  number,
  Record<number, (buffer: UBuffer) => { data: string; desc: string }>
> = {
  0: {
    0: (data: UBuffer) => {
      const netStatus = data[0]
      const newLocal = netStatus === 0 ? '已组网' : '未组网'
      const devType = data[1]
      const devTypeStr = devType === 0 ? '协调器' : devType === 1 ? '路由器' : '终端节点'
      console.log(data[9], data[10], data[11])

      return {
        data: `网络状态: ${netStatus} - ${newLocal}
设备类型: ${devType} - ${devTypeStr}
MAC 地址: ${toStr(data.subarray(2, 10))}
信道：${data[10].toString(16).toUpperCase()}
PANID: ${toStr(data.subarray(11, 13))}
短地址: ${toStr(data.subarray(13, 15))}
扩展 PANID: ${toStr(data.subarray(15, 23))}
网络密钥: ${toStr(data.subarray(23, 40))}`,
        desc: `网络状态: 0-已组网; 0xFF-未组网
设备类型: 0-协调器; 1-路由器; 2-终端节点
MAC 地址: 模组 MAC 地址,出厂就固定,全球唯一
信道：模组当前信道,未组网时没有
PANID: 模组当前 PANID, 未组网时没有
短地址: 模组当前短地址，未组网时没有
扩展 PANID: 未组网时没有
网络密钥: 未组网时没有 0`
      }
    },
    0x22: (data: UBuffer) => {
      return {
        data: `状态: ${data[0]}
地址编号: ${toStr(data.subarray(1, 2))}
节点短地址: ${toStr(data.subarray(3, 5))}
节点 MAC 地址: ${toStr(data.subarray(5, 13))}`,
        desc: `状态: 0-有入网节点; 2-无入网节点; 0xFF-超出存储范围
地址编号: 存储的地址编号
节点短地址: 入网节点的短地址
节点 MAC 地址: 入网节点的 MAC 地址`
      }
    },
    0x28: (data: UBuffer) => {
      const statusCode = data[0]
      const statusText = statusCode === 0 ? '操作有效，请等待设备上传' : '查询失败，设备可能不存在'
      return {
        data: `执行状态: ${statusCode} - ${statusText}`,
        desc: '执行状态: 0-操作有效,请等待设备上传; 0xFF-查询失败,设备可能不存在(E180-ZG120做协调器时可以多试 1~2 次(间隔 3~6 秒再试)有可能成功)'
      }
    }
  },
  0x01: {
    0x33: (data: UBuffer) => {
      return {
        data: `记录总数: ${data}`,
        desc: `查看已存在的常连接绑定，以一条一条的列表的形式输出所有的常连接绑定关系。

记录总数: 节点上建立的常连接总数
起始索引: 当前返回记录的起始编号
返回条数: 当前返回记录条数
源虚拟 SN: 节点上发起绑定源端口的虚拟 SN 号
簇 ID: 建立绑定的簇 ID
目标 SN: 绑定目标的虚拟 SN 号，可以是单个设备端口，也可以是一个分组`
      }
    }
  },
  0x80: {
    0x03: (data: UBuffer) => {
      return {
        data: `MAC 地址: ${toStr(data.subarray(0, 8))}
短地址: ${toStr(data.subarray(8, 10))}
父节点地址: ${toStr(data.subarray(10, 12))}
入网模式: ${data[12]}`,
        desc: `短地址: 入网设备的短地址
父节点地址: 入网设备的父节点地址,踢掉 End Device 需要父节点地址
入网模式:0-第一次入网,1-重新入网,2-重新入网且从新同步密钥(管理器预留密钥更换功能)`
      }
    },
    0x04: (data: UBuffer) => {
      return {
        data: `MAC 地址: ${toStr(data.subarray(0, 8))}
短地址: ${toStr(data.subarray(8, 10))}
节点类型: ${data[10]}`,
        desc: `模组或节点入网时向协调器上报 MAC 地址或短地址，以及运行过程中短地址发生变更，都会以该命令作为通知。上位机收到该命令后应该及时更新 MAC 地址与短地址映射关系。

MAC 地址: 目标节点的 MAC 地址
短地址: 目标节点的短地址
节点类型: 1-路由; 2-不休眠终端节点; 3-休眠终端节点
`
      }
    },
    0x05: (data: UBuffer) => {
      return {
        data: `终结标记: ${data[0]}
设备虚拟SN号: ${toStr(data.subarray(1, 10))}
短地址: ${toStr(data.subarray(10, 12))}
端口号: ${data[12]}
端口轮廓: ${toStr(data.subarray(13, 15))}
设备ID: ${toStr(data.subarray(15, 16))}`,
        desc: `节点第一次入网自动获取节点上的外设信息，包含设备 ID 信息，各个端口下支持的簇信息。
终结标记: 单节点入网会携带多个端口，该标记为 1 表示该节点的端口上报结束。DevSN: 设备虚拟 SN 号，见《虚拟 SN》
短地址: 设备短地址
端口号: 设备的端口号,见《端口》
端口轮廓: profile ID,应用层只需要关注 0x0104 即可，见《端口轮廓》设备 ID: 表示设备的功能,由 ZCL 协议规范决定,见表《Device ID 表》。输入簇表：设备支持的输入簇，包含簇数量和簇列表，见《簇 cluster》和《Server 端和Client端》。
输出簇表: 设备支持的输出簇，包含簇数量和簇列表，见《簇 cluster》和《Server 端和Client端》。`
      }
    }
  },
  0x81: {
    0x05: (data: UBuffer) => {
      const shortAddr = toStr(data.subarray(0, 2))
      const portList = toStr(data.subarray(5, 6 + data[4]))

      return {
        data: `短地址: ${shortAddr}
命令编号${data[2]}
执行结果: ${data[3]}
端口数量: ${data[4]}
端口列表: ${portList}`,
        desc: ''
      }
    }
  },
  0x82: {
    0x0a: (data: UBuffer) => {
      return {
        data: `发送模式: ${data[0]}
源短地址: ${toStr(data.subarray(1, 3))}
目标端口: ${numberToFullHex(data[3])}
帧序号: ${numberToFullHex(data[4])}
命令方向: ${numberToFullHex(data[5])}
簇ID: ${toStr(data.subarray(6, 8))}
厂商码: ${toStr(data.subarray(8, 10))}
信号强度: ${numberToFullHex(data[10])}
数据: ${dataParse(data.subarray(11))}
`,
        desc: ''
      }
    }
  }
}

const parse = (textRaw: string) => {
  try {
    const payload = textRaw.trim()
    const buffer = Buffer.from(payload.split(' ').map((x) => parseInt(x, 16)))
    const code = buffer[2]
    const type = buffer[3]
    const rawData = buffer.subarray(4, buffer.length - 1)
    const parseFunItem = parseFun[code][type]
    const { data, desc } = parseFunItem(rawData)
    const typeStr = typeList.find((x) => x.value === code)?.label
    const codeStr = codeList[code]?.find((x) => x.value === type)?.label
    return { code: codeStr || '', type: typeStr || '', data, desc }
  } catch (e) {
    return { code: '', type: '解析错误, 请查看控制台', data: '', desc: '' }
  }
}

const dataParse = (data: UBuffer) => {
  const dataLength = data[0]
  const dataId = toStr(data.subarray(1, 3))
  const dataType = numberToFullHex(data[3])
  const dataTypeName = (DataTypeMap[data[3]] || { name: '未知' }).name
  const dataValue = toStr(data.subarray(4, data.length))
  return `属性长度: ${dataLength}
属性Id: ${dataId}
数据类型: ${dataType} - ${dataTypeName}
数据值: ${dataValue}
`
}

export { chk8xor, calculator, toStr, parse, typeList, codeList }
