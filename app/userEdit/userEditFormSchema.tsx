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

import { updateUserAction, updateUserActionWithoutPwd } from "../api/user/route"
import { PassDataUser } from "./searchParams"

const userEditFormSchema = z.object({
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

type UserEditFormValues = z.infer<typeof userEditFormSchema>

export function UserEditForm() {
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
  const defaultValues: Partial<UserEditFormValues> = {
    nome: nomeUsuario,
    login: loginUsuario,
  }

  const router = useRouter()
  const { register, setValue } = useForm()

  const form = useForm<UserEditFormValues>({
    resolver: zodResolver(userEditFormSchema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(data: UserEditFormValues) {
    //createInsureAction(data.name)
    if (data.senha !== "") {
      const pwdHash = await CreateHashPassword(data.senha)
      await updateUserAction(
        parseInt(idUsuario),
        data.nome,
        data.login,
        pwdHash
      )
    } else {
      await updateUserActionWithoutPwd(
        parseInt(idUsuario),
        data.nome,
        data.login
      )
    }

    setValue("nome", data.nome, { shouldValidate: true, shouldDirty: true }) //
    setValue("login", data.login, { shouldValidate: true, shouldDirty: true }) //
    setValue("senha", data.senha, { shouldValidate: true, shouldDirty: true }) //
    toast.success("Usuário atualizado com sucesso!")
 
    //JSON.stringify(data, null, 2)
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
                <Input placeholder="nome" {...field} className="bg-white" />
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
                <Input placeholder="login" {...field} className="bg-white" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="senha"
          defaultValue={""}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  placeholder="senha"
                  {...field}
                  className="bg-white"
                  type="password"
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
          <Button type="button" onClick={() => router.push("/userList")}>
            Voltar
          </Button>
        </div>
      </form>
    </Form>
  )
}
