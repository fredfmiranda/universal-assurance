"use server"
import prisma from "../lib/prisma";

export async function createInsure(nome:string) { 
    try {
        const insurer = await prisma.seguradora.create({
            data: {nome}
        });
        return insurer;
    } catch (error) {
        console.log(error);
        return error;
    }finally{
        async () => {
            await prisma.$disconnect;
        }
    }  
}

export async function updateInsure(id:number, nome: string) {
    try {
        const insurerUpdate = await prisma.seguradora.update({
            where: {id: id},
            data: {nome: nome}
            
        })
        return insurerUpdate;
    } catch (error) {
        console.log(error)
    }finally{
        async () => {
            await prisma.$disconnect;
        }
    }
}

export async function deleteInsure(id:number) {

    try {
        const insurerDelete = await prisma.seguradora.delete({
            where: { id: id },
        })
        return insurerDelete;
    } catch (error) {
        console.log(error)
    }finally{
        async () => {
            await prisma.$disconnect;
        }
    }
}
