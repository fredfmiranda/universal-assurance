"use server"

import{createInsure} from '@/services/insurer'
import{updateInsure} from '@/services/insurer'
import{deleteInsure} from '@/services/insurer'

export async function createInsureAction(nome:string) {
return await createInsure(nome);
}

export async function updateInsureAction(id:number, nome: string) {
return await updateInsure(id, nome);
}

export async function deleteInsureAction(id:number) {
return await deleteInsure(id);
}





 