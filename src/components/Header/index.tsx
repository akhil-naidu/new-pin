import Container from '@/components/Container'
import getSiteSettings from '@/payload/utils/fetchSiteSettings'
import Logo from '@/public/logo.svg'
import Link from 'next/link'
import { Suspense } from 'react'
import { Menu } from './Menu'
import SignInOrProfile from './SignInOrProfile'
import { Skeleton } from '@/components/ui/Skeleton'

const Header = async () => {
  const settings = await getSiteSettings()
  return (
    <header className="absolute top-0 z-50 w-full py-2 text-black dark:text-white">
      <Container className="flex items-center gap-x-3 md:gap-x-5">
        <div className="relative order-1 flex w-auto flex-nowrap items-center gap-2 text-xl max-md:flex-auto">
          <Logo className="w-12 shrink-0" />
          <h1 className="font-bold">{settings?.header?.logo || settings?.appName}</h1>
          <Link href="/" className="absolute inset-0">
            <span className="sr-only">Go to start page</span>
          </Link>
        </div>
        <div className="order-2 flex flex-auto justify-end md:order-3 md:w-1/4">
          <Suspense
            fallback={
              <Skeleton className="h-9 w-28 bg-red-500 px-3">
                <Skeleton className="h-6 w-6 rounded-full bg-white"></Skeleton>
              </Skeleton>
            }>
            <SignInOrProfile />
          </Suspense>
        </div>
        <div className="order-3 flex items-center justify-end md:order-2 md:w-2/4 md:flex-auto md:justify-start">
          <Menu />
        </div>
      </Container>
    </header>
  )
}

export default Header
