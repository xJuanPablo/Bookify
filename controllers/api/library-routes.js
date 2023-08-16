const router = require('express').Router();
const { Library } = require('../../models')

router.post('/', async (req,res) =>{
try{
  const libraryEntry = await Library.create({
    ...req.body,
    user_id: req.session.user_id
  })
  res.status(200).json(libraryEntry);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});



router.delete('/:id', async (req, res) => {
  try {
    const user = req.session.user
    const libraryBook = await Library.destroy({
      where: {
        id: req.params.id,
        user_id: user.id,
      },
    });

    if (!libraryBook) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(libraryBook);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;