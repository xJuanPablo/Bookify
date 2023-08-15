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
  try {const loggedIn = req.session.loggedIn;
  const findProfile = await Users.findOne({
    where: { username: req.params.username }
  });
  if(!findProfile) {
    res.status(404).render('404');
    return;
  } 
  const user = findProfile;
  const username = user.username;
  const id = user.id
  const firstName = user.firstName


  const userData = await Users.findByPk(id, {
  include: [{model: Library}, {model: Reading_Entry}]
  })

  if(!userData){
    res.status(404).json({ message: 'User not found' });
    return;
  }
  

  res.render('dashboard', { username, loggedIn, firstName })
} catch(err) {res.json(err)}
})

router.get('/profile/:username/library', withAuth, async (req, res)=>{
  const loggedIn = req.session.loggedIn;
  const user = req.session.user;
  const username = user.username;
  const firstName = user.firstName;
  const id = user.id;

  const userData = await Users.findByPk(id, {
    include: {model: Library}
    })
  const libraryData = userData.libraries
  const allBooks = libraryData.map((book_name) => book_name.get({ plain: true }));
  const currentlyReading = libraryData.filter((book) => book.currently_reading).map((book) => book.get({ plain: true }));
  const completedReading = libraryData.filter((book) => book.completed).map((book) => book.get({ plain: true }));
  // res.json(books)
  if(allBooks.length === 0) {
    const noBooks = true
    res.render('library', { username, loggedIn, firstName, noBooks})
  } else {
    res.render('library', { username, loggedIn, firstName, allBooks, currentlyReading, completedReading})
  }
});

router.get('/analytics', withAuth, async (req, res)=>{
  const loggedIn = req.session.loggedIn;
  const user = req.session.user;
  const username = user.username;
  const firstName = user.firstName;
  const libraryData = await Library.findAll()
  const totalBooks = libraryData.length;
  const genres = {};
  libraryData.forEach(book => {
    if (genres.hasOwnProperty(book.genre)) {
      genres[book.genre]++
    } else {
      genres[book.genre] = 1;
    }
  });
  const genreData = Object.keys(genres).map(genre => {
    const percentage = (genres[genre] / totalBooks) * 100;
    return { genre, percentage };
  });
  // const allBooks = libraryData.map((books) => books.get({ plain: true }));
  res.render('analytics', { username, loggedIn, firstName, genreData: JSON.stringify(genreData) })
});

router.get('*', async (req, res)=>{
  const loggedIn = req.session.loggedIn;
  const user = req.session.user;
  if(user) {
    const username = user.username;
    const firstName = user.firstName;
    res.status(404);
    res.render('404', { username, loggedIn, firstName });
    return;
  } else {
    res.status(404);
    res.render('404');
    return;
  }
});

module.exports = router;
