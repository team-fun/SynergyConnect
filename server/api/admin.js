const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
      const users = await User.findAll({
        attributes: ['id', 'username', 'password', 'isAdmin', 'firstName', 'lastName', 'email', 'bio', 'icon', 'interests']
      })
      res.json(users)
    } catch (err) {
      next(err)
    }
  })

  router.get('/:id', async (req, res, next) => {
    try {
		const user = await User.findOne({
			where: { id: req.params.id },
		});
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.delete("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const data = await User.findByPk(id);
		data.destroy();
		res.send(data);
	} catch (err) {
		res.sendStatus(500);
	}
});

router.put("/:id", async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: { id: req.params.id },
		});
		res.send(await user.update(req.body));
	} catch (error) {
		next(error);
	}
});