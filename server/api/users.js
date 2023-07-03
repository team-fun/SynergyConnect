const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
   
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
router.get("/:id", async(req , res)=>{
    try {
			const user = await User.findByPk(req.params.id)
			res.json(user);
		} catch (err) {
			next(err);
		}
})

router.post("/", async (req, res, next) => {
	console.log(req);
	try {
		const { username, email } = req.body;
		const newUser = await User.create({ username, email });
		res.status(201).json(newUser);
	} catch (error) {
		next(error);
	}
});


router.put("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		console.log(req.body)
		
		const  updatedUser = await User.findByPk(id);

		if (!updatedUser) {
			return res.sendStatus(404);
		}
		updatedUser.update({...req.body, id:updatedUser.id , password:updatedUser.password})

		await updatedUser.save();

		res.json(updatedUser);
	} catch (error) {
		next(error);
	}
});





router.delete("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const deletedUser = await User.findByPk(id);

		if (!deletedUser) {
			return res.sendStatus(404);
		}

		await deletedUser.destroy();

		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});

module.exports = router;