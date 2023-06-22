"use client"

import Link from "next/link"
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, createContext, useContext } from "react";
import {CreateHashPassword} from "@/services/user"

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
  import { createUserAction } from "../api/user/route"

  const userFormSchema = z.object({
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
      senha: z
      .string({
        required_error: "Favor preencher a senha do Usuário.",
      })
      .min(8, {
        message: "A senha deve ter pelo menos 8 caracteres.",
      })
  })

  type UserFormValues = z.infer<typeof userFormSchema>

    // This can come from your database or API.
const defaultValues: Partial<UserFormValues> = {
    nome: "",
    login: "",
    senha: ""
  }

  export function UserForm() {
    const router = useRouter()

    const form = useForm<UserFormValues>({
        resolver: zodResolver(userFormSchema),
        defaultValues,
        mode: "onChange",
      })



      async function onSubmit(data: UserFormValues) {
        const pwdHash = await CreateHashPassword(data.senha)
       //alert('Valor do hash:' +  pwdHash.toString())
        createUserAction(data.nome, data.login, pwdHash)
        toast.success('Usuário cadastrado com sucesso!')
        //JSON.stringify(data, null, 2)  
        form.reset();

     
      }

      return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
              control={form.control}
              name="nome"
              defaultValue={''}
              render={({ field}) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="nome" {...field} className= "bg-white" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="login"
              defaultValue={''}
              render={({ field}) => (
                <FormItem>
                  <FormLabel>Login</FormLabel>
                  <FormControl>
                    <Input placeholder="login" {...field} className= "bg-white" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
              control={form.control}
              name="senha"
              defaultValue={''}
              render={({ field}) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input placeholder="senha" {...field} className= "bg-white" type="password" />
                  </FormControl>
                <FormMessage />
                </FormItem>
              )}
            />
            <div className="justify-items-center">
            <Button type="submit">Salvar</Button><ToastContainer autoClose={3000}/>
            </div>
            <div className="float-left buttonVoltarCadastroUsuario">
            <Button type="button" onClick={() => router.push('/main')}>Voltar</Button>
            </div>
          </form>
            </Form>
      )

  }

