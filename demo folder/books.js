//require('dotenv').config();
//const key = 'process.env.GOOGLE_API';

//TODO: Placeholder searchbar Variable
let searchBar = document.querySelector('#SearchBar');
let searchButton = document.querySelector('#searchButton');

//TODO: Make function that formats book for search engine
//make string into array
//lowercase each word in an array
//merge array to string
//replace empty space with
//! Done
const searchFormat = (search) => {
  const array = search.split(" ");
  const pickUp = array.map(word => word.replace(/[^a-zA-Z]/g, '').toLowerCase());
  const addPlus = pickUp.join('+');
  return Promise.resolve(addPlus); // Return the formatted search string as a Promise
};
/*

// const searchFormat = (search) => {
//   const array = search.split(" ");
//   const pickUp = array.map(word => word.replace(/[^a-zA-Z]/g, '').toLowerCase());
//   const addPlus = pickUp.join('+')

//   return addPlus;
// }

// searchButton.addEventListener('click', () => {
//   bookAPI().then((book) =>{
//     console.log('Book:', book)
//   })
// });

// const bookAPI = () => {
//   const searchValue = searchBar.value;
//   console.log("Search value:", searchValue)

// fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchFormat(searchBar.value)}&key=${key}`, {
//     method: 'GET'
//   })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data)
//     // Process the fetched data here
//     const bookName = data.items[0].volumeInfo.title;
//     const author = data.items[0].volumeInfo.authors[0];
//     // this is isbn 13. If we need to change to change to isbn 10, put industryIdentifiers[1]
//     const isbn = data.items[0].volumeInfo.industryIdentifiers[0].identifier;
//     const genre = data.items[0].volumeInfo.categories;
//     const pages = data.items[0].volumeInfo.pageCount;

//     const book = {
//       book_name: bookName,
//       author: author,
//       isbn: isbn,
//       genre: genre,
//       pages: pages
//     };

//     return book
//     // Do further processing or actions with the book object
//   })
//   //.catch((error) => console.error(error));
//}



// get book data from API
// async function getBookFromAPI() {
// try{
//   const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchFormat(searchBar.value)}&key=${key}`);
//   const data =await
// }

// }
*/




//TODO: Add search button functionality
// Add searchFormat function to event listener
// Add bookAPI function
//! Done
searchButton.addEventListener('click', () => {
  searchFormat(searchBar.value)
    .then(formattedSearch => bookAPI(formattedSearch)) // Pass formattedSearch to bookAPI
    .then((book) => {
      console.log('Book:', book);
    })
    .catch((error) => console.error(error));
});

//TODO: Get book data
const bookAPI = (formattedSearch) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${formattedSearch}&key=${key}`, {
    method: 'GET'
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    // Process the fetched data here
    const bookName = data.items[0].volumeInfo.title;
    const author = data.items[0].volumeInfo.authors[0];
    const isbn = data.items[0].volumeInfo.industryIdentifiers[0].identifier;
    const genre = data.items[0].volumeInfo.categories;
    const pages = data.items[0].volumeInfo.pageCount;

    const bookData = {
      book_name: bookName,
      author: author,
      isbn: isbn,
      genre: genre,
      pages: pages
    };

    return insertBookToLibrary(bookData);
  })
  .catch((error) => console.error(error));
};


//Function to seed book data
const insertBookToLibrary = (bookData) => {
  return Library.create({
    book_name: bookData.book_name,
    author: bookData.author,
    isbn: bookData.isbn,
    genre: bookData.genre,
    pages: bookData.pages,
    completed: false 
    //! Chris, please add any other properties you deem necessary.
  });
};