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

import { deleteUserAction } from "../api/user/route"
import { PassDataUser } from "./searchParams"

const userDeleteFormSchema = z.object({
  nome: z
    .string({
      required_error: "Favor preencher o nome do Usuário.",
    })
    .min(5, {
      message: "O nome deve ter pelo menos 5 caracteres.",
    }),
  login: z
    .string({
      required_error: "Favor preencher o login do Usuário.",
    })
    .min(5, {
      message: "O login deve ter pelo menos 5 caracteres.",
    }),
  senha: z.optional(z.string()),
})

type UserDeleteFormValues = z.infer<typeof userDeleteFormSchema>

export function UserDeleteForm() {
  let idUsuario = ""
  let nomeUsuario = ""
  let loginUsuario = ""

  const listParameters = PassDataUser()
  const listaUser = listParameters.split(";")
  idUsuario = listaUser[0]
  nomeUsuario = listaUser[1]
  loginUsuario = listaUser[2]
  let registroAtualizado = false

  // This can come from your database or API.
  const defaultValues: Partial<UserDeleteFormValues> = {
    nome: nomeUsuario,
    login: loginUsuario,
  }

  const router = useRouter()
  const { register, setValue } = useForm()

  const form = useForm<UserDeleteFormValues>({
    resolver: zodResolver(userDeleteFormSchema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(data: UserDeleteFormValues) {
    //createInsureAction(data.name)
    await deleteUserAction(parseInt(idUsuario))

    setValue("nome", data.nome, { shouldValidate: true, shouldDirty: true }) //
    setValue("login", data.login, { shouldValidate: true, shouldDirty: true }) //
    toast.success("Usuário excluído com sucesso!")
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nome"
          defaultValue={""}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="nome" {...field} className="bg-white" readOnly />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="login"
          defaultValue={""}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Login</FormLabel>
              <FormControl>
                <Input placeholder="login" {...field} className="bg-white" readOnly />
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
          <Button type="button" onClick={() => router.push("/userList")}>
            Voltar
          </Button>
        </div>
      </form>
    </Form>
  )
}
