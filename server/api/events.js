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

router.delete("/:id", async (req, res) => {
  try {
    const {id, title} = req.params;

    const event = await Event.findAll(id, {where: {title: title}});
    //const eventId = events[0].dataValues.id
    
    

    // const event = await Event.findByPk(req.params.id);

    if(event){
      await event.destroy();
      res.send(event);
    }else{
      res.status(404)
    }
    
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;
