"use strict";

const {
  db,
  models: { User, ChatRoom },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "cody",
      password: "123",
      firstName: "Cody",
      lastName: "Banks",
      email: "cody@gmail.com",
      friends: [2],
      interests: ["sports", "call of duty", "lebron", "one direction"],
    }),
    User.create({
      username: "drod",
      password: "123",
      firstName: "Dan",
      lastName: "Rod",
      email: "dan@gmail.com",
      friends: [1],
      interests: ["shooting", "guns", "dogs", "snakes"],
    }),
  ]);

  const chats = await Promise.all([
    ChatRoom.create({
      chatCode: "main",
      public: "true",
      users: [1, 2],
    }),
    ChatRoom.create({
      chatCode: "admin",
      public: "false",
      users: [2],
    }),
  ]);

  console.log(`seeded ${chats.length} chats`);
  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users,
    chats,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
