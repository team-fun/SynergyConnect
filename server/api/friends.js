const router = require("express").Router();
const { Op } = require("sequelize");
const {
  models: { User },
} = require("../db");
const {
  models: { Friend },
} = require("../db");
module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, { include: Friend });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const friendIds = user.friends.map((friend) => friend.friendsUserId);
    const pendingREQ = user.friends.map((friend) => friend.pending);
    const sent = user.friends.map((friend) => friend.sent);
    const received = user.friends.map((friend) => friend.received);

    const friends = await User.findAll({ where: { id: friendIds } });

    return res.json({
      friends: friends.map((x, i) => {
        return {
          ...x,
          pending: pendingREQ[i],
          sent: sent[i],
          received: received[i],
        };
      }),
    });
  } catch (err) {
    next(err);
  }
});
router.get("/notFriends/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(req.params.id, { include: Friend });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const friendIds = user.friends.map((friend) => friend.friendsUserId);
    friendIds.push(id);
    const nonFriends = await User.findAll({
      where: { id: { [Op.notIn]: friendIds } },
    });

    return res.json({
      nonFriends,
    });
  } catch (err) {
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const { loggedInUserId, otherFriendId } = req.body;
    const newMyFriend = await Friend.create({
      userId: loggedInUserId,
      friendsUserId: otherFriendId,
      pending: true,
      sent: true,
    });
    const otherUserFriend = await Friend.create({
      userId: otherFriendId,
      friendsUserId: loggedInUserId,
      pending: true,
      sent: false,
    });
    res.status(201).json();
  } catch (error) {
    next(error);
  }
});

router.put("/acceptRejectRequest", async (req, res, next) => {
  try {
    const { loggedInUserId, otherFriendId, action } = req.body;

    if (action === "accept") {
      await Friend.update(
        { pending: false },
        {
          where: {
            [Op.or]: [
              { userId: otherFriendId, friendsUserId: loggedInUserId },
              { userId: loggedInUserId, friendsUserId: otherFriendId },
            ],
          },
        }
      );
      res.status(201).json();
    } else if (action === "reject") {
      await Friend.destroy({
        where: {
          [Op.or]: [
            { userId: loggedInUserId, friendsUserId: otherFriendId },
            { userId: otherFriendId, friendsUserId: loggedInUserId },
          ],
        },
      });
      res.status(201).json();
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }
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
