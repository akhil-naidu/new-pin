import ThemeChanger from '@/components/ThemeChanger'
import Container from '@/components/Container'
import Logo from '@/public/logo.svg'
import getSiteSettings from '@/payload/utils/fetchSiteSettings'
import Link from 'next/link'

const Footer = async () => {
  const settings = await getSiteSettings()
  return (
    <footer className="border-t border-zinc-200 py-6 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white md:py-10">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-6 flex items-center space-x-2">
              <Logo className="h-10 w-10" />
              {settings?.appName ? <span className="text-xl font-bold">{settings?.appName}</span> : null}
            </div>
            {settings?.appDescription ? <p className="text-zinc-500">{settings?.appDescription}</p> : null}
            <div className="mt-6 flex items-center space-x-4"></div>
          </div>
          <nav
            className="mr-auto grid w-full grid-cols-2 place-content-center gap-x-8 gap-y-2 md:col-span-2 [&>a:hover]:text-white [&>a]:text-zinc-500
              [&>a]:transition-colors">
            <Link href="#">Home</Link>
            <Link href="#">Components</Link>
            <Link href="#">Pricing</Link>
            <Link href="#">FAQ</Link>
            <Link href="#">Contact</Link>
            <Link href="#">License</Link>
          </nav>
        </div>
        <div className="mt-10 flex items-center justify-between border-t border-zinc-700 pt-6 text-left text-sm text-zinc-500">
          <p>{settings?.footer?.copyright ? settings?.footer?.copyright : `© ${new Date().getFullYear()}. All rights reserved.`}</p>
          <div>
            <ThemeChanger />
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
