const router = require('express').Router();
const { Library } = require('../../models')

router.post('/', async (req,res) =>{
try{
  console.log('Incoming request body:', req.body);
  const libraryEntry = await Library.create({
    ...req.body
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


// const insertBookToLibrary = (bookData) => {
//   return Library.create({
//     book_name: bookData.book_name,
//     author: bookData.author,
//     isbn: bookData.isbn,
//     genre: bookData.genre,
//     pages: bookData.pages,
//     completed: false 
//     //! Chris, please add any other properties you deem necessary.
//   });
// };

module.exports = router;