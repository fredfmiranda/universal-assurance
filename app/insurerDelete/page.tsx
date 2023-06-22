

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { InsurerDeleteForm } from "@/app/insurerDelete/insurerDeleteForm"

export default function Page() {
  return (
     
     
      <div className="flex max-w-[980px] gap-2 place-content-center formCadastro">
       <InsurerDeleteForm/>
      </div>
     
  )
}