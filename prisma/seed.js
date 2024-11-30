/* eslint-disable */
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const mockPosts = [
    {
        status: 'hey, all! this is my first post.'
    },
    {
        status: 'gonna be adding my thoughts here.'
    },
    {
        status: 'this is a post about the weather.'
    },
    {
        status: 'twitter who?'
    },
    {
        status: 'no thoughts head empty bestie 🤪'
    },
    {
        status: 'living my best life rn fr fr'
    },
    {
        status: 'this fit goes so hard ngl'
    },
    {
        status: 'lowkey down bad but vibing tho'
    },
    {
        status: 'slay queen periodt 💅'
    },
    {
        status: 'touch grass? in this economy? 😭'
    },
    {
        status: 'main character energy only ✨'
    },
    {
        status: 'it\'s giving... idk what it\'s giving tbh'
    }
]

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
      status: 'hey, all! this is my first post.'
    }
  });

  await prisma.posts.create({
    data: {
      userId: user2.id,
      status: 'gonna be adding my thoughts here.'
    }
  });

  for (const post of mockPosts) {
    const randomUser = Math.random() < 0.5 ? user1 : user2;
    await prisma.posts.create({
      data: {
        userId: randomUser.id,
        status: post.status
      }
    })
  }

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
