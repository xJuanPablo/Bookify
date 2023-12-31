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
  const libraryData = userData.libraries
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

  const today = new Date();
  const pastWeekStartDate = new Date(today);
  pastWeekStartDate.setDate(today.getDate() - 6);
  
  // Fetch data from the database
  const pagesReadData = await Reading_Entry.findAll({
    attributes: ['date', 'pages_read'],
    where: {
      user_id: id
    },
  });
  
  // Process the data to create labels and series
  const labels = [];
  const series = [];
  
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(pastWeekStartDate);
    currentDate.setDate(pastWeekStartDate.getDate() + i);
  
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  
    labels.push(formattedDate);
  
    const pagesReadEntry = pagesReadData.find(entry =>
      entry.date.toISOString().split('T')[0] === currentDate.toISOString().split('T')[0]
    );
    series.push(pagesReadEntry ? pagesReadEntry.pages_read : 0);
  }

  const completedReading = libraryData.filter((book) => book.completed).map((book) => book.get({ plain: true })).length
  const yearlyGoal = userData.yearly_goal
  const goalPercentageCalc = (completedReading / yearlyGoal) * 100;
  const goalPercentage = goalPercentageCalc.toFixed(2);

  // if(pagesReadData.length === 0 && totalBooks === 0) {
  //   const noBooks = true;
  //   const noEntries = true;
  //   res.render('dashboard', { username, loggedIn, firstName, noBooks, noEntries, totalBooks, completedReading: JSON.stringify(completedReading), yearlyGoal, goalPercentage})
  //   return
  // }
  // if(totalBooks === 0) {
  //   const noBooks = true;
  //   const yesEntries = true;
  //   res.render('dashboard', { username, loggedIn, firstName, yesEntries, noBooks, totalBooks, labels: JSON.stringify(labels), series: JSON.stringify(series), completedReading: JSON.stringify(completedReading), yearlyGoal, goalPercentage })
  //   return
  // }

  // if(pagesReadData.length === 0) {
  //   const noEntries = true;
  //   const yesBooks = true;
  //   res.render('dashboard', { username, loggedIn, firstName, noEntries, yesBooks, genreData: JSON.stringify(genreData), totalBooks, completedReading: JSON.stringify(completedReading), yearlyGoal, goalPercentage })
  //   return
  // }
  // const yesBooks = true;
  // const yesEntries = true;

  let noBooks = false;
  let noEntries = false;
  let noGoal = false;
  let yesBooks = false;
  let yesEntries = false;
  let yesGoal = false;

  if (!yearlyGoal) {
    noGoal = true;
  } else {
    yesGoal = true;
  }

  if (pagesReadData.length === 0) {
    noEntries = true;
  }

  if (totalBooks === 0) {
    noBooks = true;
  }

  if (!noBooks && !noEntries) {
    yesBooks = true;
    yesEntries = true;
  } else if (noBooks && !noEntries) {
    yesEntries = true;
  } else if (!noBooks && noEntries) {
    yesBooks = true;
  }
  res.render('dashboard', { username, loggedIn, firstName, noEntries, noBooks, noGoal, yesGoal, yesEntries, yesBooks, genreData: JSON.stringify(genreData), labels: JSON.stringify(labels), series: JSON.stringify(series), totalBooks, completedReading: JSON.stringify(completedReading), yearlyGoal, goalPercentage })
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
  const futureBooks = libraryData.filter((book) => book.future_reading).map((book) => book.get({ plain: true }));
  const currentlyReading = libraryData.filter((book) => book.currently_reading).map((book) => book.get({ plain: true }));
  const completedReading = libraryData.filter((book) => book.completed).map((book) => book.get({ plain: true }));
  // res.json(books)
  if(allBooks.length === 0) {
    const noBooks = true
    res.render('library', { username, loggedIn, firstName, noBooks})
  } else {
    res.render('library', { username, loggedIn, allBooks, firstName, futureBooks, currentlyReading, completedReading})
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
