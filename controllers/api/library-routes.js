const router = require('express').Router();
const { Library } = require('../../models')

router.post('/library', async (req, res) => {
  try {
    const userId = req.session.user_id;

    const libraryEntry = await Library.create({
      ...req.body,
      user_id: userId,
    });

    res.status(200).json(libraryEntry);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;


//TODO: Do we need a delete function for the library
// router.delete('/:id', async (req, res) => {
//   try {
//     const projectData = await Project.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!projectData) {
//       res.status(404).json({ message: 'No project found with this id!' });
//       return;
//     }

//     res.status(200).json(projectData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


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