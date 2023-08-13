const router = require('express').Router();
const { Library } = require('../../models')

router.post('/library', async (req,res) =>{
try{
  const libraryEntry = await Library.create({
    ...req.body,
    book_name: req.session.book_name,
      author: req.session.author,
      isbn: req.session.isbn,
      genre: req.session.genre,
      pages: req.session.pages



  })
res.status(200).json(libraryEntry);
  } catch (err) {
    res.status(400).json(err);
  }
});


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