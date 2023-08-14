const router = require('express').Router();
const { Users } = require('../../models');
const { Op } = require('sequelize');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await Users.create({
      ...req.body
    });

    req.session.save(() => {
      req.session.user = dbUserData;
      req.session.loggedIn = true;  
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

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
    
    req.session.save(() => {
      req.session.user = dbUserData;
      req.session.loggedIn = true;
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

module.exports = router;