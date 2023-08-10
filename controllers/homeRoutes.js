const router = require('express').Router();
const { Users } = require('../models/index')
//TODO: Export function for Authentication

//TODO: Place authentication function in route handler
router.get('/', Function(), async (req,res)=>{
try {
  //TODO: replace "export" with data from models
  const userData = await Users.findall({
    // Because it's the homepage I am excluding the need for a password
  attributes: { exclude: ['password']}
})
const users = userData.map((dataTwo)=> dataTwo.get({plain: true}));

// res.render will render homepage from handlebar file
//TODO: replace 'homepage' with handlebars template
res.render('homepage', {
  users,
  logged_in: req.session.logged_in,
});
} catch (err) {
res.status(500).json(err);
}
});

module.exports = router;
