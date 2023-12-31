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
      req.session.user_id = dbUserData.id  
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const dbUserData = await Users.findByPk(req.params.id);
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

router.put('/yearlyGoal', async (req, res) => {
  try{
    const userData = await Users.update(
      {
        yearly_goal: req.body.userGoal
      },
      {
        where: {
          id: req.session.user_id
        }
      });
      return res.status(200).json({ body: userData, message: 'Yearly goal updated successfully.' });
  } catch (err){
    console.error(err);
    return res.status(500).json({ message: 'Server error.' });
  }
})

module.exports = router;