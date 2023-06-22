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
import { updateInsureAction } from "../api/insurer/route"


  const insureEditFormSchema = z.object({
    name: z
      .string({
        required_error: "Favor preencher o nome da Seguradora.",
      })
      .min(3, {
        message: "O nome deve ter pelo menos 3 caracteres.",
      })
  })

  type InsureEditFormValues = z.infer<typeof insureEditFormSchema>



 export function InsureEditForm() {

  const dadosSeguradora = BuscaValorURL()
  const listaDados = dadosSeguradora.split(';');
  const idSeguradora = listaDados[0];
  var nomeSeguradora = listaDados[1];
  let registroAtualizado = false

  // This can come from your database or API.
  const defaultValues: Partial<InsureEditFormValues> = {
    name: nomeSeguradora
  }


  const router = useRouter()
  const { register, setValue } = useForm();



    const form = useForm<InsureEditFormValues>({
        resolver: zodResolver(insureEditFormSchema),
         defaultValues,
         mode: "onChange",
      })


      async function onSubmit(data: InsureEditFormValues) {
        console.log('Chamou o alerta');
        //createInsureAction(data.name)
        await updateInsureAction(parseInt(idSeguradora), data.name)
        setValue('name', data.name, {shouldValidate: true, shouldDirty: true}); //
        toast.success('Seguradora atualizada com sucesso!')
        //JSON.stringify(data, null, 2)  

     
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
                    <Input {...field} className= "bg-white nomeSeguradora" />
                    </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
              <div className="justify-items-center">
            <Button type="submit">Salvar</Button><ToastContainer autoClose={3000}/>
            </div>
            <div className="float-left buttonVoltarCadastroUsuario">
            <Button type="button" onClick={() => router.push('/insurerList')}>Voltar</Button>
            </div>
              </form>
            </Form>
      )

  }

