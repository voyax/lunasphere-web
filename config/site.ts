export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Infant Head Shape Development Guide',
  description:
    'Scientific understanding and rational care for infant head shape development.',
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Detection',
      href: '/detection',
    },
    {
      label: 'FAQ',
      href: '/faq',
    },
  ],
  navMenuItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Detection',
      href: '/detection',
    },
    {
      label: 'FAQ',
      href: '/faq',
    },
  ],
  links: {
    github: 'https://github.com/voyax/lunasphere-web',
    website: 'https://head.melolib.com',
  },
}
