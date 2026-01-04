import React from 'react'

import HeaderAdmin from './_components/HeaderAdmin'
import AsideBar from './_components/SideBar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className='flex h-screen flex-col'>
      <HeaderAdmin />
      <div className='flex min-h-0 flex-1 overflow-hidden'>
        <AsideBar />
        <main className='min-h-0 flex-1 overflow-y-auto p-4'>{children}</main>
      </div>
    </section>
  )
}
