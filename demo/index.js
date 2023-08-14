//const key = 'AIzaSyANF_jZMUut5yIGAX8NmtEjkqD0LWcgAhU';
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
    const img = data.items[0].volumeInfo.imageLinks.thumbnail;

    const bookData = {
      book_name: bookName,
      author: author,
      isbn: isbn,
      genre: genre,
      pages: pages
    };

    return renderImage(img, bookName, author);
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





//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++==

//TODO: function to render Img
// Call render div
// ammend new div to render area
// add src attribute to ammended image

const renderImage = (imageURL, bookName, authorName) => {
  let renderImg = document.querySelector('#renderImg')

  // remove a previously rendered book, so multiple are not on the screen at the same time
  // The while loop is going through the renderImg div and deleting the first child if one is rendered
  while (renderImg.firstChild) {
    renderImg.removeChild(renderImg.firstChild);
  }

const bookImg = document.createElement('img'); bookImg.src = imageURL
const bookTitle = document.createElement('h2'); bookTitle.textContent = bookName;
const bookAuthor = document.createElement('p'); bookAuthor.textContent = `by: ${authorName}`

renderImg.appendChild(bookTitle);
renderImg.appendChild(bookImg);
renderImg.appendChild(bookAuthor);
}




//TODO:
// create a checkmark option that shows up only when a valid book appears
//If the book is checked, push to demo library
//If the book is not checked, it is erased


// function renderCheckmarkOptions(book) {
//   const checkmarkContainer = document.querySelector('#checkmarkContainer');
//   checkmarkContainer.innerHTML = ''; 

//   const likeOption = createCheckmarkOption('Like', () => moveBookToLikedBooks(book));
//   const deleteOption = createCheckmarkOption('Delete', deleteBook);

//   const confirmButton = document.createElement('button');
//   confirmButton.textContent = 'Confirm';
//   confirmButton.addEventListener('click', () => {
//     checkmarkContainer.innerHTML = ''; // Clear options
//   });

//   checkmarkContainer.appendChild(likeOption);
//   checkmarkContainer.appendChild(deleteOption);
//   checkmarkContainer.appendChild(confirmButton);
// }


// const renderCheckmark = () => {
//   const yesCheckbox = document.getElementById("yes");
//   const noCheckbox = document.getElementById("no");
//   const checkmarkDiv = document.getElementById("myDiv");

//   if (yesCheckbox.checked) {
//     checkmarkDiv.style.display = "block";
//   } else {
//     checkmarkDiv.style.display = "none";
//   }
// };