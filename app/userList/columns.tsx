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
import { deleteUserAction } from "../api/user/route"
import { findUser } from "@/services/user"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react"

export type User = {
  id: string
  nome: string
  login: string
}

export function Editar({id})  
{   const router = useRouter();
    async function handleClick() {
      let idUsuario = 0
      let nomeUsuario = ""
      let loginUsuario = ""
      const userData =  await findUser(parseInt(id))
      if (userData) {
        idUsuario = userData.id
        nomeUsuario = userData.nome
        loginUsuario = userData.login
      }
    router.push('/userEdit?id='+ encodeURIComponent(id.toString()) +'&nome='+ encodeURIComponent(nomeUsuario.toString()) +'&login='+ encodeURIComponent(loginUsuario.toString()));
  }
  
  return <button onClick={handleClick}>Editar</button>;
   
}


export function DeletarUser({id})  
{
  const router = useRouter();
  async function handleClick() {
    let idUsuario = 0
    let nomeUsuario = ""
    let loginUsuario = ""
    const userData =  await findUser(parseInt(id))
    if (userData) {
      idUsuario = userData.id
      nomeUsuario = userData.nome
      loginUsuario = userData.login
    }
  router.push('/userDelete?id='+ encodeURIComponent(id.toString()) +'&nome='+ encodeURIComponent(nomeUsuario.toString()) +'&login='+ encodeURIComponent(loginUsuario.toString()));
}

  return <button type="submit" onClick={handleClick}>Deletar</button>;
}



export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("nome")}</div>,
  },
  {
    accessorKey: "login",
    header: "Login",
    cell: ({ row }) => (
      <div>{row.getValue("login")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original

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
               <Editar id={user.id} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DeletarUser id={user.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]