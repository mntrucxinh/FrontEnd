import type { Metadata } from 'next'
import { HeroUIProvider } from '@heroui/react'

import AsideBar from '../(app)/_components/admin/asideBar/AsideBar'
import HeaderAdmin from '../(app)/_components/admin/headerAdmin/HeaderAdmin'

export const metadata: Metadata = {
  title: 'Quản lý bài đăng',
}

export default function PostManagementLayout({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <section>
        <HeaderAdmin />
        <div className='flex'>
          <AsideBar />
          <main className='flex-1 p-4'>{children}</main>
        </div>
      </section>
    </HeroUIProvider>
  )
}
