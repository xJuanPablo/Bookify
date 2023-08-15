const router = require('express').Router();
const { Users } = require('../../models');
const { Op } = require('sequelize');
const userModule = require('../../public/js/user');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await Users.create({
      ...req.body
    });

    req.session.save(() => {
      req.session.user = dbUserData;
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id  
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const dbUserData = await Users.findAll();
    res.status(200).json(dbUserData)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await Users.findOne({
      where: {
        [Op.or]: [{ email: req.body.email }, { username: req.body.username }]
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    userModule.setUser(dbUserData.id);
    req.session.save(() => {
      req.session.user = dbUserData;
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id;
      const responseData = {username: dbUserData.username};
      res.status(200).json(responseData) 
    });


  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
// get all
router.get('/', async (req, res) => {
  try {
    const dbUserData = await Users.findAll();
    res.status(200).json(dbUserData)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;