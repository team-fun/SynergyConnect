const express = require("express");
const router = express.Router();
const Event = require("../db/models/Event");
const User = require("../db/models/User");

router.get("/", async (req, res, next) => {
  try {
    const events = await Event.findAll({
      include: User,
    });
    res.status(201).send(events);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, start, end, userId } = req.body;

    const events = await Event.create({
      title,
      start,
      end,
      userId,
    });

    res.json(events);
  } catch (err) {
    next(err);
  }
});

router.delete("/:title", async (req, res) => {
  try {
    const eventTitle = req.params.title;
    const event = await Event.findOne({ where: { title: eventTitle } });


    if (event) {
      const deleteEventId = event.id;
      await event.destroy();
  
      res.json(deleteEventId);
    } else {
      res.status(404).send("Event not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
