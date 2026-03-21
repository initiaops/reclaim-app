'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '⬡' },
  { href: '/dashboard/account', label: 'Account', icon: '○' },
  { href: '/dashboard/billing', label: 'Billing', icon: '◇' },
  { href: '/dashboard/settings', label: 'Settings', icon: '◈' },
]

export function SidebarNavLinks() {
  const pathname = usePathname()

  return (
    <>
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all group ${
              isActive
                ? 'bg-purple-50 text-purple-800'
                : 'text-gray-600 hover:bg-purple-50 hover:text-purple-800'
            }`}
          >
            <span
              className={`text-base transition-colors ${
                isActive ? 'text-purple-400' : 'text-gray-300 group-hover:text-purple-400'
              }`}
            >
              {item.icon}
            </span>
            {item.label}
          </Link>
        )
      })}
    </>
  )
}

export function MobileNavLinks() {
  const pathname = usePathname()

  return (
    <>
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors text-xs font-medium ${
              isActive ? 'text-purple-700' : 'text-gray-500 hover:text-purple-700'
            }`}
          >
            <span className={`text-lg ${isActive ? 'text-purple-600' : ''}`}>{item.icon}</span>
            {item.label}
          </Link>
        )
      })}
    </>
  )
}
