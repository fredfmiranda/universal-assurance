

import { Taker, columns } from "@/app/takerList/columns"
import { DataTable } from "@/app/takerList/data-table"
import { PrismaClient } from "@prisma/client"


export async function DataTableDemo() {
     
        const prisma = new PrismaClient();    
        const taker = await prisma.tomador.findMany();
        const data: Taker[] = []
        for (let i = 0; i < taker.length; i++) {
            data.push({
            id: taker[i].id.toString(),
            cnpj: taker[i].cnpj,
            razaoSocial: taker[i].razao_social,
            telUm: taker[i].telefone_um,
            emailUm: taker[i].email_um,
            contatoUm: taker[i].contato_um,
        });	      
        }
       await prisma.$disconnect; 

        return <DataTable columns={columns} data={data} />
    
}