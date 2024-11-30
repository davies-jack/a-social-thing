/* eslint-disable */
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      email: 'john@example.com',
      username: 'johndoe',
      password: await bcrypt.hash('password123', 10)
    }
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'jane@example.com', 
      username: 'janedoe',
      password: await bcrypt.hash('password123', 10)
    }
  });

  const post1 = await prisma.posts.create({
    data: {
      userId: user1.id,
      status: 'Hello world! This is my first post.'
    }
  });

await prisma.posts.create({
    data: {
      userId: user2.id,
      status: 'Excited to join this platform!'
    }
  });

  // jane follows john
  await prisma.relationships.create({
    data: {
      followerId: user2.id,
      followingId: user1.id
    }
  });

  // jane likes john's post
  await prisma.likes.create({
    data: {
      userId: user2.id,
      postId: post1.id
    }
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
