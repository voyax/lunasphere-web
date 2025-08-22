export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: '小月颅',
  description: '科学认知婴儿头型发育，理性护理减少焦虑',
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
