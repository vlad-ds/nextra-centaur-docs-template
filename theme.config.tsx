import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { CopyPageButton } from './components/CopyPageButton'

const config: DocsThemeConfig = {
  logo: <span>My Project</span>,
  project: {
    link: 'https://github.com/vlad-ds/nextra-centaur-docs-template',
  },
  chat: {
    link: 'https://discord.com',
  },
  docsRepositoryBase: 'https://github.com/vlad-ds/nextra-centaur-docs-template',
  footer: {
    text: 'Nextra-Centaur Docs Template',
  },
  main: ({ children }) => {
    return (
      <>
        <CopyPageButton />
        {children}
      </>
    )
  }
}

export default config