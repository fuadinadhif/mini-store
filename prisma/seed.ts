import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

import { prisma } from "@/configs/prisma";

async function main() {
  try {
    await prisma.user.deleteMany();
    await prisma.product.deleteMany();

    /* ------------------------------ CREATE USERS ------------------------------ */
    for (let i = 0; i < 5; i++) {
      const hashedPassword = await bcrypt.hash("newpass", 10);

      await prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: hashedPassword,
        },
      });

      console.log(
        `Created user ${
          i + 1
        } with email: ${faker.internet.email()} and hashed password`
      );
    }

    console.log("✅ Seeded 5 users with hashed passwords");

    /* ----------------------------- CREATE PRODUCTS ---------------------------- */
    for (let i = 0; i < 30; i++) {
      await prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: parseFloat(faker.commerce.price()),
          stock: faker.number.int({ min: 1, max: 100 }),
          image: faker.image.urlPicsumPhotos({ blur: 0, grayscale: false }),
        },
      });
    }

    console.log("✅ Seeded 30 products");
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
