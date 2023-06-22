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
import { deleteInsureAction } from "../api/insurer/route"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export type Insurer = {
  id: string
  nome: string
  
}

export function Editar({id, nome})  
{   const router = useRouter();
    function handleClick() {
    router.push('/insurerEdit?id='+ encodeURIComponent(id.toString()) +'&nome='+ encodeURIComponent(nome.toString()));
  }
  
  return <button onClick={handleClick}>Editar</button>;
   
}

export function DeletarInsure({id, nome})  
{ 
  const router = useRouter();
    function handleClick() {
    router.push('/insurerDelete?id='+ encodeURIComponent(id.toString()) +'&nome='+ encodeURIComponent(nome.toString()));
  }
  


  return <button type="submit" onClick={handleClick}>Deletar</button>;
}

export const columns: ColumnDef<Insurer>[] = [
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const insurer = row.original

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
               <Editar id={insurer.id} nome={insurer.nome} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DeletarInsure id={insurer.id} nome={insurer.nome} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]