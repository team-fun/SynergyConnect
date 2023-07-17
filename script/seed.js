"use strict";

const {
  db,
  models: { User, Friend, Participant, Chat, MessageData, Event },
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
      username: "adam",
      password: "123",
      isAdmin: true,
      firstName: "Adam",
      lastName: "Green",
      email: "adam@gmail.com",
      interests: ["health & wellness", "AI", "taco bell"],
    }),
    User.create({
      username: "drod",
      password: "123",
      isAdmin: true,
      firstName: "Dan",
      lastName: "Rod",
      email: "dan@gmail.com",
      interests: ["shooting", "guns", "dogs", "snakes"],
    }),
    User.create({
      username: "jovans",
      password: "123",
      isAdmin: true,
      firstName: "Jovan",
      lastName: "Stosic",
      email: "jovan@gmail.com",
      interests: ["coding", "video games", "more coding"],
    }),
    User.create({
      username: "testDummy",
      password: "123",
      isAdmin: false,
      firstName: "Calvin",
      lastName: "Hobbes",
      email: "chobbes@gmail.com",
      interests: ["tigers", "lions", "bears", "oh my"],
    }),
    User.create({
      username: "Emoman",
      password: "321",
      isAdmin: true,
      firstName: "Keith",
      lastName: "Russell",
      email: "keith@gmail.com",
      interests: ["Jujutsu Kaisen", "being sad", "digimon"],
    }),
    User.create({
      username: "BronxsBandit",
      password: "123",
      isAdmin: true,
      firstName: "Femi",
      lastName: "Bamgbose",
      email: "femi@gmail.com",
      interests: ["basketball", "lebron lover", "pizza", "money"],
    }),
    User.create({
      username: "doglover21",
      password: "123",
      isAdmin: true,
      firstName: "Gina",
      lastName: "Castromonte",
      email: "gina@gmail.com",
      interests: ["animals", "tv shows", "pizza"],
    }),
  ]);

  const friends = await Promise.all([
    Friend.create({
      userId: 1,
      friendsUserId: 2,
    }),
    Friend.create({
      userId: 2,
      friendsUserId: 3,
      pending: false,
    }),
    Friend.create({
      userId: 3,
      friendsUserId: 1,
      pending: false,
    }),
  ]);

  const chats = await Promise.all([
    Chat.create({
      name: "main",
      description: "this the main chat",
      code: "main",
      public: true,
      image: "https://cdn-icons-png.flaticon.com/512/6676/6676508.png",
    }),
    Chat.create({
      name: "test",
      description: "test chat",
      code: "test",
      public: false,
      image: "https://cdn-icons-png.flaticon.com/512/2916/2916315.png",
    }),
    Chat.create({
      name: "admin",
      description: "this is the super secret chat",
      code: "admin",
      public: false,
      image: "https://www.pngmart.com/files/21/Admin-Profile-PNG-Clipart.png",
    }),
    Chat.create({
      name: "sports",
      description: "FOOTTBALL!!!",
      code: "sports",
      public: true,
      image:
        "https://static.vecteezy.com/system/resources/previews/008/470/102/original/orange-basketball-sport-hand-drawn-free-png.png",
    }),
  ]);

  const participants = await Promise.all([
    Participant.create({
      userId: 1,
      chatId: 3,
    }),
    Participant.create({
      userId: 2,
      chatId: 3,
    }),
    Participant.create({
      userId: 3,
      chatId: 3,
    }),
    Participant.create({
      userId: 1,
      chatId: 1,
    }),
    Participant.create({
      userId: 2,
      chatId: 1,
    }),
    Participant.create({
      userId: 3,
      chatId: 1,
    }),
  ]);

  const startDateTime = new Date(2023, 6, 10, 11, 0, 0);
  const endDateTime = new Date(2023, 6, 10, 11, 30, 0);

  const events = await Promise.all([
    Event.create({
      title: "Event 1",
      start: startDateTime,
      end: endDateTime,
      userId: 1,
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${friends.length} friends`);
  console.log(`seeded ${chats.length} chats`);
  console.log(`seeded ${participants.length} participants`);
  console.log(`seeded ${events.length} events`);
  console.log(`seeded successfully`);
  return {
    users,
    chats,
    friends,
    participants,
    events,
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
