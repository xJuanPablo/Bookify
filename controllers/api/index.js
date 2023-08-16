const router = require('express').Router();

const userRoutes = require('./user-routes');
const libraryRoutes = require('./library-routes');
const entryRoutes = require('./entry-routes');

router.use('/users', userRoutes);
router.use('/library', libraryRoutes);
router.use('/entry', entryRoutes);

module.exports = router;
