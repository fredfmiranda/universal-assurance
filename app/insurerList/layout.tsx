

import "@/styles/globals.css"
import { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"


import { ReactNode } from "react"

interface InsureListLayoutProps { children: ReactNode }



export default function InsureListLayout({children}: InsureListLayoutProps) {
  return (
   <div><h1>Listar Seguradora</h1>
    {children}
    </div>
  )
}
