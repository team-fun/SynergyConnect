const router = require("express").Router();

const {
  models: { User },
} = require("../db");

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    await user.update({ online: true });
    await user.reload();
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});

router.get("/logout", async (req, res) => {
  const user = await User.findByToken(req.headers.authorization);
  await user.update({ online: false });
  await user.reload();
  res.send("ok");
});

module.exports = router;
