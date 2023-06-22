

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { UserForm } from "./userForm"



export default function Page() {
  return (
    
      <div className="flex max-w-[980px] flex-col items-start gap-2 place-content-center formCadastro">
       <UserForm/>
      </div>
     
  )
}
