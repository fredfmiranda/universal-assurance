"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { useRouter} from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RedirectType } from "next/dist/client/components/redirect"
import { deleteTakerAction } from "../api/taker/route"
import { findTaker } from "@/services/taker"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react"

export type Taker = {
  id: string
  cnpj: string
  razaoSocial: string
  telUm: string
  emailUm: string
  contatoUm: string
}

export function Editar({id})  
{   const router = useRouter();
    async function handleClick() {
      let idTaker = ""
      let cnpj = ""
      let razaoSocial = ""
      let telUm = ""
      let emailUm = ""
      let contatoUm = ""
      let telDois = ""
      let emailDois = ""
      let contatoDois = ""


      const takerData =  await findTaker(parseInt(id))
       if (takerData) {
         idTaker = takerData.id.toString
         cnpj = takerData.cnpj
         razaoSocial = takerData.razao_social
         telUm = takerData.telefone_um
         emailUm = takerData.email_um
         contatoUm = takerData.contato_um
         telDois = takerData.telefone_dois
         emailDois = takerData.email_dois
         contatoDois = takerData.contato_dois
        
      }
    //console.log(id)
    //router.push('/takerEdit?idTaker='+ encodeURIComponent(id.toString()))
    
    router.push('/takerEdit?idTaker='+ encodeURIComponent(id.toString()) +'&cnpj='+ encodeURIComponent(cnpj.toString()) +'&razaoSocial='+ encodeURIComponent(razaoSocial.toString()) +'&telUm='+ encodeURIComponent(telUm.toString()) +'&emailUm='+ encodeURIComponent(emailUm.toString()) +'&contatoUm='+ encodeURIComponent(contatoUm.toString()) +'&telDois='+ encodeURIComponent(telDois.toString()) +'&emailDois='+ encodeURIComponent(emailDois.toString()) +'&contatoDois='+ encodeURIComponent(contatoDois.toString()));
  }
  
  return <button onClick={handleClick}>Editar</button>;
   
}


export function DeletarTaker({id})  
{
  const router = useRouter();
  async function handleClick() {
    let idTaker = ""
    let cnpj = ""
    let razaoSocial = ""
    let telUm = ""
    let emailUm = ""
    let contatoUm = ""
    let telDois = ""
    let emailDois = ""
    let contatoDois = ""


    const takerData =  await findTaker(parseInt(id))
     if (takerData) {
       idTaker = takerData.id.toString
       cnpj = takerData.cnpj
       razaoSocial = takerData.razao_social
       telUm = takerData.telefone_um
       emailUm = takerData.email_um
       contatoUm = takerData.contato_um
       telDois = takerData.telefone_dois
       emailDois = takerData.email_dois
       contatoDois = takerData.contato_dois
      
    }

  
  router.push('/takerDelete?idTaker='+ encodeURIComponent(id.toString()) +'&cnpj='+ encodeURIComponent(cnpj.toString()) +'&razaoSocial='+ encodeURIComponent(razaoSocial.toString()) +'&telUm='+ encodeURIComponent(telUm.toString()) +'&emailUm='+ encodeURIComponent(emailUm.toString()) +'&contatoUm='+ encodeURIComponent(contatoUm.toString()) +'&telDois='+ encodeURIComponent(telDois.toString()) +'&emailDois='+ encodeURIComponent(emailDois.toString()) +'&contatoDois='+ encodeURIComponent(contatoDois.toString()));
}

  return <button type="submit" onClick={handleClick}>Deletar</button>;
}



export const columns: ColumnDef<Taker>[] = [
  {
    accessorKey: "cnpj",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CNPJ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("cnpj")}</div>,
  },
  {
    accessorKey: "razaoSocial",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Razão Social
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase colunaRazaoSocial">{row.getValue("razaoSocial")}</div>,
  },
  {
    accessorKey: "telUm",
    header: "Telefone Um",
    cell: ({ row }) => (
      <div>{row.getValue("telUm")}</div>
    ),
  },
  {
    accessorKey: "emailUm",
    header: "Email Um",
    cell: ({ row }) => (
      <div>{row.getValue("emailUm")}</div>
    ),
  },
  {
    accessorKey: "contatoUm",
    header: "Contato Um",
    cell: ({ row }) => (
      <div>{row.getValue("contatoUm")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const taker = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem>
               <Editar id={taker.id} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DeletarTaker id={taker.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]