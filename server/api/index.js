const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/createroom", require("./createRoom"));
router.use("/chats", require("./chats"));
router.use("/chat", require("./chat"));

const {
  models: { User },
} = require("../db");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

const isAdminCheck = (req, res, next) => {
  requireToken(req, res, next, () => {
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .send("Unauthorized: You do not have access to this page");
    } else {
      next();
    }
  });
};
router.use("/admin", isAdminCheck, require("./admin"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
router.use((err, req, res, next) => {
  // Error handling middleware
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

module.exports = router;
