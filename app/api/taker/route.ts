"use server"

import{createTaker} from '@/services/taker'
import{updateTaker} from '@/services/taker'
import{deleteTaker} from '@/services/taker'


export async function createTakerAction( cnpj: string,
    razaoSocial: string,
    telefoneUm: string,
    telefoneDois: string,
    emailUm: string,
    emailDois: string,
    contatoUm: string,
    contatoDois: string) {
await createTaker(cnpj,razaoSocial,telefoneUm,telefoneDois,emailUm,emailDois,contatoUm,contatoDois)   
}

export async function updateTakerAction(  id: number,
    cnpj: string,
    razaoSocial: string,
    telefoneUm: string,
    telefoneDois: string,
    emailUm: string,
    emailDois: string,
    contatoUm: string,
    contatoDois: string) {
return await updateTaker(id, cnpj,razaoSocial,telefoneUm,telefoneDois,emailUm,emailDois,contatoUm,contatoDois)
}


export async function deleteTakerAction(id:number) {
await deleteTaker(id);
}