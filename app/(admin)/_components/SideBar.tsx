'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Accordion,
  AccordionItem,
  cn,
  Tooltip,
  type AccordionItemIndicatorProps,
} from '@heroui/react'
import { ChevronLeft, ChevronRight, Dot } from 'lucide-react'

import { MAIN_SIDEBAR_ITEMS, type SidebarItem } from '@/types/constants/sidebar-items'

const Indicator = ({ isOpen = false }: AccordionItemIndicatorProps) => {
  return isOpen ? (
    <ChevronLeft className='size-5 text-foreground' />
  ) : (
    <ChevronRight className='size-5 text-foreground' />
  )
}

const MainSidebar = () => {
  const pathName = usePathname()
  const [isExpanded, setIsExpanded] = useState(true)

  const expandedKeys = useMemo(() => {
    return MAIN_SIDEBAR_ITEMS.filter((sideBarItem) =>
      sideBarItem.items?.some((subItem) => subItem.path === pathName)
    ).map((sideBarItem) => sideBarItem.label)
  }, [pathName])

  const itemTextClass = (isActive: boolean) =>
    cn('text-white transition-colors group-hover:text-content1', isActive && 'text-content1')

  const renderIcon = (icon: React.ReactNode, isActive: boolean) => {
    const classes = cn('size-5', itemTextClass(isActive))

    if (React.isValidElement(icon)) {
      const existing = (icon.props as { className?: string })?.className
      return React.cloneElement(icon, { className: cn(existing, classes) } as any)
    }

    return <span className={classes}>{icon}</span>
  }

  const renderSidebarItem = (item: SidebarItem, index: number, keyPrefix = ''): React.ReactNode => {
    const key = `${keyPrefix}${item.label}-${item.path ?? 'group'}-${index}`

    const isActive = item.path
      ? pathName === item.path
      : !!item.items?.some((sub) => sub.path === pathName)

    // Item có path => Link
    if (item.path) {
      return (
        <Tooltip
          key={key}
          radius='sm'
          closeDelay={250}
          color='foreground'
          content={item.label}
          className={cn(isExpanded && 'hidden')}
        >
          <Link
            href={item.path}
            className={cn(
              'hover:bg-default-100 group flex items-center whitespace-nowrap rounded p-2 transition',
              isActive && 'bg-default-100',
              isExpanded ? 'justify-start gap-3' : 'justify-center'
            )}
          >
            <span className='shrink-0'>
              {item.icon ? (
                renderIcon(item.icon, isActive)
              ) : (
                <Dot className={cn('size-4', itemTextClass(isActive))} />
              )}
            </span>

            <span
              className={cn(
                'text-sm font-medium',
                !isExpanded && 'hidden',
                itemTextClass(isActive)
              )}
            >
              {item.label}
            </span>
          </Link>
        </Tooltip>
      )
    }

    // Item dạng group => Accordion
    return (
      <Tooltip
        key={key}
        radius='sm'
        closeDelay={250}
        color='foreground'
        content={item.label}
        className={cn(isExpanded && 'hidden')}
      >
        <Accordion defaultExpandedKeys={expandedKeys} className='px-0'>
          <AccordionItem
            key={item.label}
            classNames={{
              title: cn(
                'whitespace-nowrap text-sm font-medium transition-colors',
                itemTextClass(isActive),
                !isExpanded && 'w-0 opacity-0'
              ),
              trigger: cn(
                'group gap-2 py-0 transition hover:bg-default-100',
                isActive && 'bg-default-100'
              ),
              heading: 'p-2 group',
              content: cn('space-y-2', isExpanded ? 'ml-2' : 'py-0'),
              indicator: cn(!isExpanded && 'hidden'),
            }}
            title={item.label}
            startContent={
              <span className='shrink-0'>
                {item.icon ? (
                  renderIcon(item.icon, isActive)
                ) : (
                  <Dot className={cn('size-4', itemTextClass(isActive))} />
                )}
              </span>
            }
            indicator={Indicator}
          >
            {isExpanded &&
              item.items?.map((subItem, i) => renderSidebarItem(subItem, i, `${key}-`))}
          </AccordionItem>
        </Accordion>
      </Tooltip>
    )
  }

  return (
    <div
      className={cn(
        'bg-content1 light:border-gray-200 relative flex h-full min-h-0 w-[200px] flex-col border-r px-2 pt-2 transition-all duration-300 dark:border-gray-700',
        !isExpanded && 'w-14'
      )}
    >
      <div
        className='bg-content1 light:border-gray-200 absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 cursor-pointer rounded-full border p-2 dark:border-gray-700'
        role='button'
        aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        onClick={() => setIsExpanded((v) => !v)}
      >
        {isExpanded ? (
          <ChevronLeft className='size-5 text-white' />
        ) : (
          <ChevronRight className='size-5 text-white' />
        )}
      </div>

      {/* List scroll riêng khi dài */}
      <div className='my-2 flex min-h-0 flex-1 flex-col space-y-2 overflow-y-auto overflow-x-hidden [&>p]:hidden'>
        {MAIN_SIDEBAR_ITEMS.map((item, idx) => renderSidebarItem(item, idx))}
      </div>
    </div>
  )
}

export default MainSidebar
