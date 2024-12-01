# a-social thing. 🧑‍🤝‍🧑

⚠️ **this project is a work in progress!**

150 characters max, and you can only like a post when it's on your timeline.

a social media app created with next.js, tailwind, prisma and postgresql. tested using jest and react-testing-library. using server components.

created to showcase my skills, and for fun.

## features

so far, you can:

- sign up and log in with your own account.
- view profiles of yourself and other users.
- follow or unfollow other users via their profile page.
- view a timeline of posts, created by yourself and users you follow.
- post a status update to your timeline.
- like posts on your timeline.

## installation

to install, firstly clone the repo, then run `npm install` to install the dependencies.

copy the `.env.example` file to `.env` and supply your own values.

with a postgresql database running, run `npx prisma migrate dev` to create the schema and seed the database.

lastly, run `npm run dev` to start the development server. you can navigate to `localhost:3000` to view the app.

### logging in

with the seed data, i have set up some relationships between users, and users liking other users posts.

you can log in with the following credentials:

```
email: `john@example.com`
password: `password123`
```

or you can log in with jane's account:

```
email: `jane@example.com`
password: `password123`
```

you can also sign up with your own account.

### testing

i have some tests written using jest and react-testing-library. you can run `npm test` to run the tests. sadly, using the async server components makes it difficult to test anything that relies on server state. i will revert to a tool such as cypress to achieve this.