"use client"

import { createContext, useContext, useState } from "react"
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

import { createInsureAction } from "../api/insurer/route"
import "react-toastify/dist/ReactToastify.css"

const insureFormSchema = z.object({
  name: z
    .string({
      required_error: "Favor preencher o nome da Seguradora.",
    })
    .min(3, {
      message: "O nome deve ter pelo menos 3 caracteres.",
    }),
})

type InsureFormValues = z.infer<typeof insureFormSchema>

// This can come from your database or API.
const defaultValues: Partial<InsureFormValues> = {
  name: "",
}

export function InsureForm() {
  const router = useRouter()

  const form = useForm<InsureFormValues>({
    resolver: zodResolver(insureFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: InsureFormValues) {
    console.log("Chamou o alerta")
    createInsureAction(data.name)
    toast.success("Seguradora cadastrada com sucesso!")
    //JSON.stringify(data, null, 2)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          defaultValue={""}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="seguradora"
                  {...field}
                  className="bg-white nomeSeguradora"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="justify-items-center">
          <Button type="submit">Salvar</Button>
          <ToastContainer autoClose={3000} />
        </div>
        <div className="float-left buttonVoltarCadastroUsuario">
        <Button type="button" onClick={() => router.push("/main")}>
          Voltar
        </Button>
        </div>
      </form>
    </Form>
  )
}
