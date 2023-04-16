import { MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'

export interface MenuItem {
  label: string
  path?: string
}

export interface MenuGroup {
  label: string
  children: MenuItem[]
}

export const renderMenuLabel = (option: MenuItem) => {
  return option.path
    ? h(
        RouterLink,
        {
          to: option.path
        },
        { default: () => option.label }
      )
    : option.label
}

export const createOptions = (): MenuOption[] =>
  toolsMenus.map(
    (group): MenuOption => ({
      label: group.label + ` (${group.children.length})`,
      type: 'group',
      key: group.label,
      children: group.children.map(
        (item): MenuOption => ({
          label: () => renderMenuLabel(item),
          key: item.path
        })
      )
    })
  )

export const toolsMenus: MenuGroup[] = [
  {
    label: '基础工具',
    children: [
      {
        path: '/base64',
        label: 'Base64'
      },
      {
        path: '/uuid',
        label: 'UUID'
      }
    ]
  }
]
