

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { UserEditForm } from "./userEditFormSchema"


export default function Page() {
  return (
     
     
      <div className="flex max-w-[980px] gap-2 place-content-center formCadastro">
       <UserEditForm/>
      </div>
     
  )
}