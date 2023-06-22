

import { Insurer, columns } from "@/app/insurerList/columns"
import { DataTable } from "@/app/insurerList/data-table"
import { PrismaClient } from "@prisma/client"


export async function DataTableDemo() {
     
        const prisma = new PrismaClient();    
        const insurer = await prisma.seguradora.findMany();
        const data: Insurer[] = []
        for (let i = 0; i < insurer.length; i++) {
            data.push({
            id: insurer[i].id.toString(),
            nome: insurer[i].nome
        });	      
        }
       await prisma.$disconnect; 

        return <DataTable columns={columns} data={data} />
    
}