

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { TakerDeleteForm } from "./takerDeleteForm"


export default function Page() {
  return (
     
     
      <div className="flex max-w-[980px] gap-2 place-content-center formCadastro">
       <TakerDeleteForm/>
      </div>
     
  )
}