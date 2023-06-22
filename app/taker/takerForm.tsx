"use client"

import { createContext, useContext, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import InputMask from "react-input-mask"
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

import { createTakerAction } from "../api/taker/route"
import "react-toastify/dist/ReactToastify.css"

const takerFormSchema = z.object({
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
  telDois: z.optional(z.string()),
  emailDois: z.optional(z.string()),
  contatoDois: z.optional(z.string()),
})

type TakerFormValues = z.infer<typeof takerFormSchema>

// This can come from your database or API.
const defaultValues: Partial<TakerFormValues> = {
  cnpj: "",
  telUm: "",
  emailUm: "",
  contatoUm: "",
  razaoSocial: "",
  telDois: "",
  emailDois: "",
  contatoDois: "",
}

export function TakerForm() {
  const router = useRouter()

  const form = useForm<TakerFormValues>({
    resolver: zodResolver(takerFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const [cpfCnpj, setCpfCnpj] = useState("")
  const [mask, setMask] = useState("")

  function onSubmit(data: TakerFormValues) {
    console.log(data)
    createTakerAction(data.cnpj, data.razaoSocial?.toString(), data.telUm, data.telDois, data.emailUm,  data.emailDois, data.contatoUm, data.contatoDois)
    toast.success("Tomador cadastrado com sucesso!")
    //JSON.stringify(data, null, 2)
    form.reset()
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
                <Input placeholder="email" {...field} className="bg-white" />
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
                <Input placeholder="contato" {...field} className="bg-white" />
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
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="telDois"
          defaultValue={""}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tel 2</FormLabel>
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
                  
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emailDois"
          defaultValue={""}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mail 2</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} className="bg-white" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contatoDois"
          defaultValue={""}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contato 2</FormLabel>
              <FormControl>
                <Input placeholder="contato" {...field} className="bg-white" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="justify-items-center">
          <Button type="submit">Salvar</Button>   <ToastContainer autoClose={3000} />
        </div>
        <div className="float-left buttonVoltarCadastroUsuario">
        <Button type="button" onClick={() => router.push("/main")}>   Voltar
        </Button>
        </div>
       
      </form>
    </Form>
  )
}
