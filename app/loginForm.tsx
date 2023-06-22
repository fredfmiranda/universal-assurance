"use client"

import { createContext, useContext, useState } from "react"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"
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

const loginFormSchema = z.object({
  login: z.string({
    required_error: "Favor preencher o login.",
  }),
  senha: z.string({
    required_error: "Favor preencher a senha.",
  }),
})

type LoginFormValues = z.infer<typeof loginFormSchema>

// This can come from your database or API.
const defaultValues: Partial<LoginFormValues> = {
  login: "",
  senha: "",
}

function LoginForm() {
  const router = useRouter()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(data: LoginFormValues) {
    //const pwdHash = await CreateHashPassword(data.senha)
    //alert('Valor do hash:' +  pwdHash.toString())
    //createUserAction(data.nome, data.login, pwdHash)
    //.success('Usuário cadastrado com sucesso!')
    //JSON.stringify(data, null, 2)
    //form.reset();
    //router.push('/user')
    if (data.login == "admin" && data.senha == "Adm@pwd2206#") {
      router.push("/main")
    } else {
      toast.error("Usuário ou senha inválidos!")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="login"
          defaultValue={""}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Login</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} className="bg-white" />
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
                  placeholder=""
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
          <Button type="submit">Entrar</Button>
          <ToastContainer autoClose={3000} />
        </div>
      </form>
    </Form>
  )
}

export default LoginForm
