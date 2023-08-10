const router = require('express').Router();
const { Users } = require('../models/index')
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
  res.render('login');
});

module.exports = router;
