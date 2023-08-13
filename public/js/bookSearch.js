require('dotenv').config();
const key = process.env.GOOGLE_API;
//Please change these variables to actual search-bar and button values
let searchBar = document.querySelector('#SearchBar');
let searchButton = document.querySelector('#searchButton');

// This function extracts the data from the google API
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

// This function formats the book for google's API
const searchFormat = (search) => {
  const makeArray = search.split(" ");
  const removeCharacters = makeArray.map(word => word.replace(/[^a-zA-Z]/g, '').toLowerCase());
  const addPlus = removeCharacters.join('+');
  return Promise.resolve(addPlus);
};


searchButton.addEventListener('click', () => {
  searchFormat(searchBar.value)
    .then(formattedSearch => bookAPI(formattedSearch)) 
    .then((book) => {
      console.log('Book:', book);
    })
    .catch((error) => console.error(error));
});