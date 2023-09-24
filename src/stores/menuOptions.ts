import { MenuGroupOption, MenuOption } from 'naive-ui'
import { VNodeChild } from 'vue'
import { RouterLink } from 'vue-router'

export interface MenuGroup {
  label: string
  children: MenuOption[]
}

export const renderMenuLabel = (option: MenuOption | MenuGroupOption): VNodeChild =>
  option.path
    ? h(
        RouterLink,
        {
          to: option.path
        },
        { default: () => option.label }
      )
    : h(option.label || '')

export const createOptions = (): MenuOption[] =>
  toolsMenus.map(
    (group): MenuOption => ({
      label: group.label + ` (${group.children.length})`,
      type: 'group',
      key: group.label,
      children: group.children.map(
        (item): MenuOption => ({
          label: () => renderMenuLabel(item),
          key: item.path as string
        })
      )
    })
  )

export const toolsMenus: MenuGroup[] = [
  {
    label: '基础工具',
    children: [
      {
        path: '/uuid',
        label: 'UUID'
      }
    ]
  },
  {
    label: '文本转换',
    children: [
      {
        path: '/text/base64',
        label: 'Base64'
      },
      {
        path: '/text/radix',
        label: '进制转换'
      }
    ]
  },
  {
    label:'硬件工具',
    children:[
      {
        path:'/hardware/EByte-Zigbee',
        label:'EByte-Zigbee'
      }
    ]
  }
]
