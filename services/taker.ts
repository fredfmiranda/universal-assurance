"use server"

import bcrypt from "bcrypt"

import prisma from "../lib/prisma"

export async function createTaker(
  cnpj: string,
  razaoSocial: string,
  telefoneUm: string,
  telefoneDois: string,
  emailUm: string,
  emailDois: string,
  contatoUm: string,
  contatoDois: string
) {
  try {
    const taker = await prisma.tomador.create({
      data: {
        cnpj: cnpj,
        razao_social: razaoSocial,
        telefone_um: telefoneUm,
        telefone_dois: telefoneDois,
        email_um: emailUm,
        email_dois: emailDois,
        contato_um: contatoUm,
        contato_dois: contatoDois,
      },
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

export async function updateTaker(
  id: number,
  cnpj: string,
  razaoSocial: string,
  telefoneUm: string,
  telefoneDois: string,
  emailUm: string,
  emailDois: string,
  contatoUm: string,
  contatoDois: string
) {
  try {
    const takerUpdate = await prisma.tomador.update({
      where: { id: id },
      data: {
        cnpj: cnpj,
        razao_social: razaoSocial,
        telefone_um: telefoneUm,
        telefone_dois: telefoneDois,
        email_um: emailUm,
        email_dois: emailDois,
        contato_um: contatoUm,
        contato_dois: contatoDois,
      },
    })
    return takerUpdate
  } catch (error) {
    console.log(error)
  } finally {
    ;async () => {
      await prisma.$disconnect
    }
  }
}

export async function deleteTaker(id: number) {
  try {
    const takerDelete = await prisma.tomador.delete({
      where: { id: id },
    })
    return takerDelete
  } catch (error) {
    console.log(error)
  } finally {
    ;async () => {
      await prisma.$disconnect
    }
  }
}

export async function findTaker(id: number) {
  try {
    const taker = await prisma.tomador.findFirst({
      where: { id: id },
    })
    return taker
  } catch (error) {
    console.log(error)
  } finally {
    ;async () => {
      await prisma.$disconnect
    }
  }
}
