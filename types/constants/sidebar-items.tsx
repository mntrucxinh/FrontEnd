import { Album, Bell, Newspaper } from 'lucide-react'

import { APP_ROUTES } from '@/config/routes'

export interface SidebarItem {
  label: string
  icon?: JSX.Element
  path?: string
  role?: string
  items?: { label: string; icon?: JSX.Element; path: string }[]
}

export const MAIN_SIDEBAR_ITEMS: SidebarItem[] = [
  // 1> Quản lý tin tức
  {
    label: 'Quản lý tin tức',
    icon: <Newspaper className='size-5' />,
    path: APP_ROUTES.RESOURCES.NEWS_MANAGEMENT,
  },
  // 2> Quản lý thông báo
  {
    label: 'Quản lý thông báo',
    icon: <Bell className='size-5' />,
    path: APP_ROUTES.RESOURCES.ANNOUNCEMENTS_MANAGEMENT,
  },
  // 3> Quản lý album
  {
    label: 'Quản lý ảnh & video',
    icon: <Album className='size-5' />,
    path: APP_ROUTES.RESOURCES.ALBUM_MANAGEMENT,
  },
]
