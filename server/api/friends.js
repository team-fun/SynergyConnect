const router = require("express").Router();
const {
	models: { User },
} = require("../db");
const {
	models: { Friend },
} = require("../db");
module.exports = router;

router.get("/:id", async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id, { include: Friend });

		if (!user) {
			// Handle case where user with the given ID is not found
			return res.status(404).json({ error: "User not found" });
		}

		// Extract friend IDs
		const friendIds = user.friends.map((friend) => friend.friendsUserId);
		const pendingREQ = user.friends.map((friend) => friend.pending);

		// Retrieve all users who are friends of the specified user
		const friends = await User.findAll({ where: { id: friendIds } });

		// Return the friends
		return res.json({
			friends: friends.map((x, i) => {
				return { ...x, pending: pendingREQ[i] };
			}),
		});
	} catch (err) {
		next(err);
	}
});

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
		const { username, email } = req.body;
		const updatedUser = await User.findByPk(id);

		if (!updatedUser) {
			return res.sendStatus(404);
		}

		updatedUser.username = username;
		updatedUser.email = email;

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
