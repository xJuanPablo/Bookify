const key = 'AIzaSyANF_jZMUut5yIGAX8NmtEjkqD0LWcgAhU'
let searchBar = document.querySelector('#SearchBar');
let searchButton = document.querySelector('#searchButton');
let bookData = {};

// This function accepts the book name and formats it to the api's preference.
const searchFormat = (search) => {
  //This takes the string(search result) and makes it an array
  const makeArray = search.split(" ");
  //This Makes a new array and removes any characters that are not letters, then makes them lower case
  const removeCharacters = makeArray.map(word => word.replace(/[^a-zA-Z]/g, '').toLowerCase());
  //This makes the array into a string combined with a +
  const addPlus = removeCharacters.join('+');
  //The "Promise.resolve()" allows us to use the function  in a chain of promises.
    return Promise.resolve(addPlus);
};

// This function locates the checkmarkContainer div and makes it visible.
const renderCheckBox = () => {
  const checkmarkContainer = document.querySelector('#checkmarkContainer');
  checkmarkContainer.style.display = 'block';
}

//This searches the google API and returns the data, putting it into an object.
const bookAPI = async (formattedSearch) => {
  return await fetch(`https://www.googleapis.com/books/v1/volumes?q=${formattedSearch}&key=${key}`, {
    method: 'GET'
  })
  .then((response) => response.json())
  .then((data) => {
    const bookName = data.items[0].volumeInfo.title;
    const author = data.items[0].volumeInfo.authors[0];
    const isbn = data.items[0].volumeInfo.industryIdentifiers[0].identifier;
    const genre = data.items[0].volumeInfo.categories[0];
    const pages = data.items[0].volumeInfo.pageCount;
    const img = data.items[0].volumeInfo.imageLinks.thumbnail;
    
    bookData = {
        book_name: bookName,
        author: author,
        isbn: isbn,
        genre: genre,
        pages: pages,
        img: img,
    };
    
    return { img, bookData };
  })
  .catch((error) => console.error(error));
};



//This function takes in the image URL provided by the data and the book object. The results will render the image in the renderImg div
const renderImage = (imageURL, bookData) => {
  let renderImg = document.querySelector('#renderImg');
  
  //This loop prevents the search result from holding on to multiple books.
  while (renderImg.firstChild) {
    renderImg.removeChild(renderImg.firstChild);
  }
  
  const bookImg = document.createElement('img');
  bookImg.src = imageURL;
  bookImg.className = 'flex items-center justify-center p-4 mx-auto rounded-b-md font-sans text-2xl';
  
  const bookTitle = document.createElement('h2');
  bookTitle.textContent = bookData.book_name;

  bookTitle.className = 'bg-gray-300 dark:bg-stone-400 flex items-center justify-center p-4 mx-auto mt-3 h-20 w-96 rounded-t-md font-sans text-2xl';
  
  const bookAuthor = document.createElement('p');
  bookAuthor.textContent = `by: ${bookData.author}`;
  bookAuthor.className = 'bg-gray-300 dark:bg-stone-400 flex items-center justify-center p-4 mx-auto h-20 w-96 font-sans text-2xl';
  
  renderImg.appendChild(bookTitle);
  renderImg.appendChild(bookImg);
  renderImg.appendChild(bookAuthor);
};

//This takes in the book object and sees if the book data is valid
const isValidBook = (bookData) => {
  return !!bookData.book_name && !!bookData.author;
};


//This is the function that pushes the book data in to the library array
async function addBookToLibrary(bookData) {
    console.log(bookData)
    try {
        const response = await fetch('/api/library', {
            method: 'POST',
            body: JSON.stringify(bookData),
            headers: { 'Content-Type': 'application/json' },
          });

        if (response.ok) {
            console.log('Book added successfully');
            document.location.reload();
        } else {
            const errorMessage = await response.json();
            console.error(errorMessage.message);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}






searchButton.addEventListener('click', () => {
  // Takes the search result and formats it
  searchFormat(searchBar.value)
  //promise taking the formatted result and put's it in the function to search through google's a
    .then(formattedSearch => bookAPI(formattedSearch))
    .then(({ img, bookData: fetchedBookData }) => {
      console.log('Book:', fetchedBookData);
      renderImage(img, fetchedBookData);
      if (isValidBook(fetchedBookData)) {
        checkmarkContainer.style.display = 'block';
      } else {
        checkmarkContainer.style.display = 'none';
      }
    })
    .catch((error) => console.error(error));
});

function clearSearchResult() {
  const confirmButtonContainer = document.getElementById('confirmButtonContainer');
  renderImage('', { book_name: '', author: '' });
  const renderImg = document.getElementById('renderImg')
  const radioInputs = document.querySelectorAll('input[name="choice"]');
  radioInputs.forEach(input => input.checked = false);
  const checkmarkContainer = document.getElementById('checkmarkContainer');
  renderImg.style.display = 'none';
  checkmarkContainer.style.display = 'none';
  confirmButtonContainer.style.display = 'none';
}


document.addEventListener('DOMContentLoaded', function () {
  const myForm = document.getElementById('myForm');
  const checkmarkContainer = document.getElementById('checkmarkContainer');
  const confirmButtonContainer = document.getElementById('confirmButtonContainer');
  const confirmButton = document.getElementById('confirmButton');

  searchButton.addEventListener('click', () => {
    searchFormat(searchBar.value)
      .then(formattedSearch => bookAPI(formattedSearch))
      .then(({ img, bookData: fetchedBookData }) => {
        console.log('Book:', fetchedBookData);
        renderImage(img, fetchedBookData);
        if (isValidBook(fetchedBookData)) {
          checkmarkContainer.style.display = 'block';
          confirmButtonContainer.style.display = 'block';
        } else {
          checkmarkContainer.style.display = 'none';
          confirmButtonContainer.style.display = 'none';
        }
      })
      .catch((error) => console.error(error));
  });

  // myForm.addEventListener('submit', function (event) {
  //   event.preventDefault();

    const selectedOption = document.querySelector('input[name="choice"]:checked');

    if (selectedOption) {
      if (selectedOption.value === 'yes') {
        bookData = fetchedBookData; 
        confirmButtonContainer.style.display = 'block';
      } else if (selectedOption.value === 'no') {
        clearSearchResult();
      }
    }
    return false;
  });





  confirmButton.addEventListener('click', function () {
    const selectedOption = document.querySelector('input[name="choice"]:checked');
    if (selectedOption && selectedOption.id === 'currently') {
      bookData.currently_reading = true;
      addBookToLibrary(bookData);
    } else if (selectedOption && selectedOption.id === 'future') {
      bookData.future_reading = true;
      addBookToLibrary(bookData);
    } else if (selectedOption && selectedOption.id === 'completed') {
      bookData.completed = true;
      addBookToLibrary(bookData);
    }
    clearSearchResult();
    confirmButtonContainer.style.display = 'none';
  });

  wrongBookButton.addEventListener('click', function () {
    clearSearchResult();
    confirmButtonContainer.style.display = 'none';
  });
//});