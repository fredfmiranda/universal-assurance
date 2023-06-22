

import { User, columns } from "@/app/userList/columns"
import { DataTable } from "@/app/userList/data-table"
import { PrismaClient } from "@prisma/client"


export async function DataTableDemo() {
     
        const prisma = new PrismaClient();    
        const user = await prisma.usuario.findMany();
        const data: User[] = []
        for (let i = 0; i < user.length; i++) {
            data.push({
            id: user[i].id.toString(),
            nome: user[i].nome,
            login: user[i].login,
        });	      
        }
       await prisma.$disconnect; 

        return <DataTable columns={columns} data={data} />
    
}