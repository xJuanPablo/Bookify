const router = require('express').Router();
const { Users, Library, Reading_Entry } = require('../models/index');
const withAuth = require('../utils/auth');

router.get('/', async (req,res)=>{
  const user = req.session.user;
  const loggedIn = req.session.loggedIn;
  if (user){
    res.render('homepage', {loggedIn, firstName: user.firstName, username: user.username});
  } else {
    res.render('homepage', {loggedIn});
  }
});


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/register', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('registration');
});

router.get('/profile/:username', withAuth, async (req,res)=>{
  const loggedIn = req.session.loggedIn;
  const findProfile = await Users.findOne({
    where: { username: req.params.username }
  });
  if(!findProfile) {
    res.status(404);
    res.render('404');
    return;
  }
  const user = findProfile;
  const username = user.username;
  const id = user.id
  const firstName = user.firstName
  // const readingEntryData = await Reading_Entry.findByPk(id)
  // const libraryData = await Library.findByPk(id)

  const userData = await Users.findByPk(id, {
  include: [{model: Library}, {model: Reading_Entry}]
  })

  if(!userData){
    res.status(404).json({ message: 'User not found' });
    return;
  }
  // const test = userData.libraries
  // const books = test.map((bookname) => bookname.get({ plain: true }));
  // res.status(200).json(test)
  res.render('dashboard', { username, loggedIn, firstName })
})

router.get('/profile/:username/library', async (req, res)=>{
  const loggedIn = req.session.loggedIn;
  res.render('library', { username, loggedIn, firstName })
});

router.get('/analytics', async (req, res)=>{
  const loggedIn = req.session.loggedIn;
  res.render('analytics', { username, loggedIn, firstName })
});

module.exports = router;
