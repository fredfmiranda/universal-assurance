"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify"
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

import "react-toastify/dist/ReactToastify.css"
import { CreateHashPassword, findUser } from "@/services/user"
import { useRouteLoaderData } from "react-router-dom"
import { PassDataTaker } from "./searchParams"
import { deleteTakerAction } from "../api/taker/route"
import InputMask from "react-input-mask"

const takerDeleteFormSchema = z.object({
  cnpj: z.string({
    required_error: "Favor preencher o cnpj do Tomador.",
  }),
  telUm: z.string({
    required_error: "Favor preencher o telefone um do Tomador.",
  }),
  emailUm: z.string({
    required_error: "Favor preencher o email um Tomador.",
  }),
  contatoUm: z.string({
    required_error: "Favor preencher o contato um Tomador.",
  }),
  razaoSocial: z.optional(z.string()),
})

type TakerDeleteFormValues = z.infer<typeof takerDeleteFormSchema>

export function TakerDeleteForm() {
  let idTaker = ""
  let cnpjTaker = ""
  let razaoSocialTaker = ""
  let telUmTaker = ""
  let emailUmTaker = ""
  let contatoUmTaker = ""
  let telDoisTaker = ""
  let emailDoisTaker = ""
  let contatoDoisTaker = ""

  const listParameters = PassDataTaker()
  const listaTaker = listParameters.split(";")
  idTaker = listaTaker[0]
  cnpjTaker = listaTaker[1]
  razaoSocialTaker = listaTaker[2]


  telUmTaker = listaTaker[3]
  emailUmTaker = listaTaker[4]
  contatoUmTaker = listaTaker[5]



  let registroAtualizado = false

  // This can come from your database or API.
  const defaultValues: Partial<TakerDeleteFormValues> = {
  cnpj: cnpjTaker,
  telUm: telUmTaker,
  emailUm: emailUmTaker,
  contatoUm: contatoUmTaker,
  razaoSocial: razaoSocialTaker,
  }

  const router = useRouter()
  const { register, setValue } = useForm()

  const form = useForm<TakerDeleteFormValues>({
    resolver: zodResolver(takerDeleteFormSchema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(data: TakerDeleteFormValues) {
    //createInsureAction(data.name)
   await deleteTakerAction(parseInt(idTaker))
   toast.success("Tomador excluído com sucesso!")
  
    //JSON.stringify(data, null, 2)
  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="cnpj"
        defaultValue={""}
        render={({ field }) => (
          <FormItem>
            <FormLabel>CNPJ</FormLabel>
            <FormControl>
              <InputMask
                // mask options
                mask={"99.999.999/9999-99"}
                alwaysShowMask={false}
                maskPlaceholder=""
                className="border-color-gray-300 border-solid border-2 rounded-md w-full p-2"
                // input options
                type={"text"}
                {...field} 
                placeholder="Ex: 99.999.999/9999-99"
                readOnly
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="telUm"
        defaultValue={""}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tel 1</FormLabel>
            <FormControl>
              <InputMask
                // mask options
                mask={"(99)99999-9999"}
                alwaysShowMask={false}
                maskPlaceholder=""
                className="border-color-gray-300 border-solid border-2 rounded-md w-full p-2"
                // input options
                type={"text"}
                {...field} 
                placeholder="Ex: (99)99999-9999"
                readOnly
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="emailUm"
        defaultValue={""}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mail 1</FormLabel>
            <FormControl>
              <Input placeholder="email" {...field} className="bg-white" readOnly />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="contatoUm"
        defaultValue={""}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contato 1</FormLabel>
            <FormControl>
              <Input placeholder="contato" {...field} className="bg-white" readOnly />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="razaoSocial"
        defaultValue={""}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Razão Social</FormLabel>
            <FormControl>
              <Input
                placeholder="razão social"
                {...field}
                className="bg-white"
                readOnly
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
        <div className="justify-items-center">
          <Button type="submit">Excluir</Button>
          <ToastContainer autoClose={3000} />
        </div>
        <div className="float-left buttonVoltarCadastroUsuario">
          <Button type="button" onClick={() => router.push("/takerList")}>
            Voltar
          </Button>
        </div>
      </form>
    </Form>
  )
}
