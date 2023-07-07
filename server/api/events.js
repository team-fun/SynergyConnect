const express = require("express");
const router = express.Router();
const Event = require("../db/models/Event");
const User = require("../db/models/User");

router.get("/", async (req, res, next) => {
  try {
    //const { id } = req.params;
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

    const event = await Event.create({
      title,
      start,
      end,
      userId,
    });

    res.json(event);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
