type IPCName = 'Yeek' | 'Devify' | 'Tptp'

export interface ICP {
  name: IPCName
  keyword: string
  ICPName: string
  ICP: string
}

const IPC: Record<IPCName, ICP> = {
  Yeek: {
    name: 'Yeek',
    keyword: 'yeek',
    ICPName: '驿客开发',
    ICP: '粤ICP备2021109792号-1'
  },
  Devify: {
    name: 'Devify',
    keyword: 'devify',
    ICPName: '前端开发工具',
    ICP: '粤ICP备2021109792号-2'
  },
  Tptp: {
    name: 'Tptp',
    keyword: 'tptp',
    ICPName: '太朴太朴',
    ICP: '粤ICP备2021109792号-3'
  }
}

export const useICP = (): ICP => {
  const domain = location.host.toLocaleLowerCase()
  if (domain.includes(IPC.Yeek.keyword)) {
    return IPC.Yeek
  } else if (domain.includes(IPC.Tptp.keyword)) {
    return IPC.Tptp
  } else {
    return IPC.Devify
  }
}
