import pkg from "./generated/prisma/client.js";
const { PrismaClient, User } = pkg;
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

// delete entries in db to reset seed
await prisma.user.deleteMany();

// seed
const createRandomUser = async () => {
  //TODO for loop 15 users
  // create an array 15 indexs [{name: faker.item}]
  await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      items: {
        create: {
          name: faker.vehicle.model(),
          reviews: {
            create: [
              {
                content: faker.lorem.paragraph(),
                rating: faker.number.int(1, 5),
                author: User, // TODO fix this!!!
              },
            ],
            comments: {
              create: [
                {
                  content: faker.lorem.sentence(),
                  author: User, // TODO fix this too!!!!
                },
              ],
            },
          },
        },
      },
    },
  });
};

for (let i = 0; i < 20; i++) {
  createRandomUser();
  console.log(i, " entries");
}
