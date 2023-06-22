"use client"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import NavigationMenuUniversalAssurance from "./main/navigationMenu"
import LoginForm from "./loginForm"


export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] gap-2 place-content-center formLogin">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            <span className="text-cyan-800">Universal Insurance</span> 
          <LoginForm />
        </h1>
       
      </div>
     
    </section>
  )
}
