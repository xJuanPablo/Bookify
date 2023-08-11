const router = require('express').Router();
const { Users, Library, Reading_Entry } = require('../models/index')
//TODO: Export function for Authentication

//TODO: Place authentication function in route handler
router.get('/', (req,res)=>{

  //TODO: replace "export" with data from models
//   const userData = await Users.findall({
//     // Because it's the homepage I am excluding the need for a password
//   attributes: { exclude: ['password']}
// })
// const users = userData.map((dataTwo)=> dataTwo.get({plain: true}));

// res.render will render homepage from handlebar file
//TODO: replace 'homepage' with handlebars template
  res.render('homepage' 
  // {
  //   users,
  //   logged_in: req.session.logged_in,}
    );
});


router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
//TODO: Replace with handlebar login screen
  res.render('test');
});

router.get('/profile/:username', async (req,res)=>{
  const username = req.params.username;
  let id = 1
  // const user = req.session.user;
  // const username = user.username;
  // const id = user.id
  // const readingEntryData = await Reading_Entry.findByPk(id)
  // const libraryData = await Library.findByPk(id)
  const userData = await Users.findByPk(id, {
    include: [{model: Library}, {model: Reading_Entry}]
  })
  const test = userData.libraries
  const books = test.map((bookname) => bookname.get({ plain: true }));
  // res.status(200).json(test)
  res.render('profilepage', { username, books})
})

router.get('/profile/:username/library', async (req, res)=>{
  res.render('library', { 
    // params here
  })
});

router.get('/analytics', async (req, res)=>{
  res.render('analytics', { 
    // params here
  })
});

module.exports = router;
