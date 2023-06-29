<<<<<<< HEAD
const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/createroom", require("./createRoom"));
router.use('/chats', require("./chats"));
=======
const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

const requireToken = async (req, res, next) => {
	try {
		const token = req.headers.authorization
		const user = await User.findByToken(token)
        req.user = user
		next()
	} catch (e) {
		next(e)
	}
}

const isAdminCheck = (req, res, next) => {
	requireToken(req, res, next, () => { 
    if (!req.user.isAdmin) {
      return res.status(403).send('Unauthorized: You do not have access to this page')
    } else {
      next()
    }
  })
}

router.use('/users', require('./users'))
router.use('/admin', isAdminCheck, require('./admin'))

>>>>>>> origin

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
