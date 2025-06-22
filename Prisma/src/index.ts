import { PrismaClient } from '@prisma/client';
const client = new PrismaClient();

async function createUser() {
//  await client.user.create({
//     data: {
//         username: "John Doe",
//         password: "securepassword",
//         age: 30,
//         city: "New York",
//     }
// })
const user = client.user.findFirst({
    where: {
        id:2
    }, include: {
        todo: true 
    }

})
console.log(user);
}

createUser();

