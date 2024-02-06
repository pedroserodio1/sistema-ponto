/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
const prisma = new PrismaClient()

async function main(){
    const hashedPassword = await hash('12345', 8)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mainUser = await prisma.user.upsert({
        where: {
            username: "pedroserodio",
            id: ""
        },
        create: {
            username: "pedroserodio",
            password: hashedPassword
        },
        update: {
            username: "pedroserodio",
            password: hashedPassword
        }
    })
}

main().then(async () => {
    await prisma.$disconnect
}) .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })