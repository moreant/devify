type IPCName = 'Yeek' | 'Devify' | 'Tptp'

export interface ICP {
  name: IPCName
  keyword: string
  ICP: string
}

const IPC: Record<IPCName, ICP> = {
  Yeek: {
    name: 'Yeek',
    keyword: 'yeek',
    ICP: '粤ICP备2021109792号-1'
  },
  Devify: {
    name: 'Devify',
    keyword: 'devify',
    ICP: '粤ICP备2021109792号-2'
  },
  Tptp: {
    name: 'Tptp',
    keyword: 'tptp',
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
