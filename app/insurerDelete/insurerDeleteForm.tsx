"use client"

import Link from "next/link"
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/react-hook-form/form"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BuscaValorURL } from "./searchParams"
import { deleteInsureAction, updateInsureAction } from "../api/insurer/route"


  const insurerDeleteFormSchema = z.object({
    name: z
      .string({
        required_error: "Favor preencher o nome da Seguradora.",
      })
      .min(3, {
        message: "O nome deve ter pelo menos 3 caracteres.",
      })
  })

  type InsurerDeleteFormValues = z.infer<typeof insurerDeleteFormSchema>



 export function InsurerDeleteForm() {

  const dadosSeguradora = BuscaValorURL()
  const listaDados = dadosSeguradora.split(';');
  const idSeguradora = listaDados[0];
  var nomeSeguradora = listaDados[1];
  let registroAtualizado = false

  // This can come from your database or API.
  const defaultValues: Partial<InsurerDeleteFormValues> = {
    name: nomeSeguradora
  }


  const router = useRouter()
  const { register, setValue } = useForm();



    const form = useForm<InsurerDeleteFormValues>({
        resolver: zodResolver(insurerDeleteFormSchema),
         defaultValues,
         mode: "onChange",
      })


      async function onSubmit(data: InsurerDeleteFormValues) {
        console.log('Chamou o alerta');
        //createInsureAction(data.name)
        await deleteInsureAction(parseInt(idSeguradora))
        setValue('name', data.name, {shouldValidate: true, shouldDirty: true}); //
        toast.success('Seguradora excluída com sucesso!')
        //JSON.stringify(data, null, 2)  
        form.reset();
     
      }

     
      return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
              control={form.control}
              name="name"
              defaultValue={''}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} className= "bg-white nomeSeguradora" readOnly/>
                    </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
              <div className="justify-items-center">
            <Button type="submit">Excluir</Button><ToastContainer autoClose={3000}/>
            </div>
            <div className="float-left buttonVoltarCadastroUsuario">
            <Button type="button" onClick={() => router.push('/insurerList')}>Voltar</Button>
            </div>
              </form>
            </Form>
      )

  }

