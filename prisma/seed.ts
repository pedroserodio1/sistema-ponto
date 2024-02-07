/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await hash("admin", 8);
   
    const openingDate = new Date("2003-05-28").toISOString()
    const birthday = new Date("2003-05-28").toISOString()

  const companyData = {
    name: "Empresa 1",
    opening_date: openingDate,
    phone: "(00) 0000-0000",
    state_registration: "000.000.000.000",
    adress: {
      street: "teste",
      number: "123",
      city: "teste",
      district: "teste",
      cep: "00000-000",
      state: "TESTE",
    },
    numberphone: "(0) 00000-0000",
    cnpj: "00.000.000/0001-00",
    email: "teste@teste.com",
    site: "www.teste.com.br",
  };

  const mainCompany = await prisma.company.create({data: companyData})

  const employeeData = {
    "name": "Pedro",
	"surname": "Serodio",
	"birthday": birthday,
	"function": "ADMIN",
	"nivel": 1,
	"address": {
		"street": "Avenida Camilo de Barros Laraia",
		"number": "945",
		"city": "Pouso Alegre",
		"district": "Cidade Jardim",
		"cep": "37556640",
		"state": "MG"
	},
	"numberphone": "92 8594-4536",
	"cpf": "000.000.000-00",
	"email": "teste@gmail.com",
	"company_id": mainCompany.id
  }

  const mainEmployee = await prisma.employee.create({data: employeeData})

  await prisma.user.create({
    data: {
        username: "admin",
        password: hashedPassword,
        employee_id: mainEmployee.id
    }
  })

}

main()
  .then(async () => {
    await prisma.$disconnect;
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
