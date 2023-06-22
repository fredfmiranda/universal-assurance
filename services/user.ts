"use server"

import bcrypt from "bcrypt"

import prisma from "../lib/prisma"

export async function createUser(nome: string, login: string, senha: string) {
  try {
    const user = await prisma.usuario.create({
      data: { nome: nome, login: login, senha: senha },
    })
  } catch (error) {
    console.log(error)
    return error
  } finally {
    ;async () => {
      await prisma.$disconnect
    }
  }
}

export async function updateUser(
  id: number,
  nome: string,
  login: string,
  senha: string
) {
  try {
    const userUpdate = await prisma.usuario.update({
      where: { id: id },
      data: { nome: nome, login: login, senha: senha },
    })
    return userUpdate
  } catch (error) {
    console.log(error)
  } finally {
    ;async () => {
      await prisma.$disconnect
    }
  }
}

export async function updateUserWithoutPwd(
  id: number,
  nome: string,
  login: string
) {
  try {
    const userUpdate = await prisma.usuario.update({
      where: { id: id },
      data: { nome: nome, login: login },
    })
    return userUpdate
  } catch (error) {
    console.log(error)
  } finally {
    ;async () => {
      await prisma.$disconnect
    }
  }
}

export async function deleteUser(id: number) {
  try {
    const userDelete = await prisma.usuario.delete({
      where: { id: id },
    })
    return userDelete
  } catch (error) {
    console.log(error)
  } finally {
    ;async () => {
      await prisma.$disconnect
    }
  }
}

export async function findUser(id: number) {
  try {
    const user = await prisma.usuario.findFirst({
      where: { id: id },
    })
    return user
  } catch (error) {
    console.log(error)
  } finally {
    ;async () => {
      await prisma.$disconnect
    }
  }
}

export async function CreateHashPassword(senha: string) {
  const saltRounds = 10
  const myPlaintextPassword = senha
  const hashPwd = await bcrypt.hash(myPlaintextPassword, saltRounds).then(function (hash) {
    return hash.toString()
  })
  console.log('hash:' + hashPwd.toString())
  return hashPwd
 
}

export async function CompareHashPassword(senha: string, hash: string) {
    const myPlaintextPassword = senha
    const hashPwd = hash
    
    bcrypt.compare(myPlaintextPassword, hashPwd).then(function (result) {
        return result
    })
}
