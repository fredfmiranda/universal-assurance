"use server"

import{createUser} from '@/services/user'
import{updateUser} from '@/services/user'
import{deleteUser} from '@/services/user'
import {updateUserWithoutPwd} from '@/services/user'


export async function createUserAction(nome:string, login:string, senha:string) {
await createUser(nome,login,senha);
}

export async function updateUserAction(id:number, nome:string, login:string, senha:string) {
return await updateUser(id, nome, login, senha);
}

export async function updateUserActionWithoutPwd(id:number, nome:string, login:string) {
    return await updateUserWithoutPwd(id, nome, login);
}

export async function deleteUserAction(id:number) {
await deleteUser(id);
}





 