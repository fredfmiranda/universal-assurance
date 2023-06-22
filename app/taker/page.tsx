

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { TakerForm } from "./takerForm"



export default function Page() {
  return (
    
      <div className="flex max-w-[980px] flex-col items-start gap-2 place-content-center formCadastro">
       <TakerForm/>
      </div>
     
  )
}
