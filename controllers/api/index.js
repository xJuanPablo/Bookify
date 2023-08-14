const router = require('express').Router();

const userRoutes = require('./user-routes');
const libraryRoutes = require('./library-routes');

router.use('/users', userRoutes);
router.use('/library', libraryRoutes);

module.exports = router;
