const currentlyReadingList = document.getElementById('currently-list'); 
const futureReadingList = document.getElementById('book-list'); 
const completedReadingList = document.getElementById('compelted-list'); 

currentlyReadingList.addEventListener('click', async (event) => {
    event.preventDefault;
    const deleteButton = event.target.closest('.deleteMe');
  
    if (deleteButton) {
      const entryId = deleteButton.parentElement.dataset.entryId;
      
        try {
            const response = await fetch(`/api/library/${entryId}`, {
            method: 'DELETE',
            credentials: 'include'
            });

            if (response.ok) {
                console.log('Entry deleted successfully');
                document.location.reload();
            } else {
                const errorMessage = await response.json();
                console.error(errorMessage.message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
});

futureReadingList.addEventListener('click', async (event) => {
    event.preventDefault;
    const deleteButton = event.target.closest('.deleteMe');
  
    if (deleteButton) {
      const entryId = deleteButton.parentElement.dataset.entryId;
      
        try {
            const response = await fetch(`/api/library/${entryId}`, {
            method: 'DELETE',
            credentials: 'include'
            });

            if (response.ok) {
                console.log('Entry deleted successfully');
                document.location.reload();
            } else {
                const errorMessage = await response.json();
                console.error(errorMessage.message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
});

completedReadingList.addEventListener('click', async (event) => {
    event.preventDefault;
    const deleteButton = event.target.closest('.deleteMe');
  
    if (deleteButton) {
      const entryId = deleteButton.parentElement.dataset.entryId;
      
        try {
            const response = await fetch(`/api/library/${entryId}`, {
            method: 'DELETE',
            credentials: 'include'
            });

            if (response.ok) {
                console.log('Entry deleted successfully');
                document.location.reload();
            } else {
                const errorMessage = await response.json();
                console.error(errorMessage.message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
});

document.addEventListener('click', async (event) => {
    const clickedElement = event.target;
    const bookItem = clickedElement;
    const bookId = bookItem.parentElement.parentElement.dataset.entryId;
    const modal = document.getElementById(`bookModal-${bookId}`);
  
    // Check if a book-item was clicked
    if (clickedElement.classList.contains('book-item')) {
      const bookItem = clickedElement;
      const bookId = bookItem.parentElement.parentElement.dataset.entryId;
      console.log(bookId)
      console.log(bookItem)
  
      // Fetch book details using bookId from your database
      try {
        const response = await fetch(`/api/library/${bookId}`, {
          method: 'GET'
        });
        if (response.ok) {
            const bookData = await response.json();
            console.log(bookData)
            // Construct unique IDs for elements using bookId
            const modal = document.getElementById(`bookModal-${bookId}`);
            const bookImgElement = document.getElementById(`bookImg-${bookId}`);
            const bookNameElement = document.getElementById(`bookName-${bookId}`);
            const bookAuthorElement = document.getElementById(`bookAuthor-${bookId}`);
            const bookISBNElement = document.getElementById(`bookISBN-${bookId}`);
            const bookPagesElement = document.getElementById(`bookPages-${bookId}`);
            const bookGenreElement = document.getElementById(`bookGenre-${bookId}`);
            const deleteButton = document.getElementById(`deleteButton-${bookId}`);
            const completeButton = document.getElementById(`completeButton-${bookId}`);
            const startButton = document.getElementById(`startButton-${bookId}`);
    
            // Update elements with book data
            bookImgElement.setAttribute('src', bookData.img);
            bookNameElement.textContent = bookData.book_name;
            bookAuthorElement.textContent = bookData.author;
            bookISBNElement.textContent = bookData.isbn;
            bookPagesElement.textContent = bookData.pages;
            bookGenreElement.textContent = bookData.genre;
    
            // Open the modal
            modal.style.display = 'flex';
        } else {
          console.error('Error fetching book data:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  
    // Check if the close button was clicked
    if (clickedElement.id === 'closeModal') {
        const bookItem = clickedElement;
        const bookId = bookItem.parentElement.parentElement.parentElement.dataset.entryId;
        const modal = document.getElementById(`bookModal-${bookId}`);
        console.log(bookId)
        modal.style.display = 'none';
    }
  
    // Add event listeners for other modal buttons
    // ...
    if (clickedElement.classList.contains('btn-delete')) {
        const bookItem = clickedElement;
        const bookId = bookItem.parentElement.parentElement.parentElement.dataset.entryId;
        const modal = document.getElementById(`bookModal-${bookId}`);
        console.log(bookId)
        try {
            const response = await fetch(`/api/library/${bookId}`, {
            method: 'DELETE',
            credentials: 'include'
            });

            if (response.ok) {
                console.log('Entry deleted successfully');
                document.location.reload();
            } else {
                const errorMessage = await response.json();
                console.error(errorMessage.message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
        modal.style.display = 'none';
    }

    if (clickedElement.classList.contains('btn-start')) {
        const bookItem = clickedElement;
        const bookId = bookItem.parentElement.parentElement.parentElement.dataset.entryId;
        const modal = document.getElementById(`bookModal-${bookId}`);
        console.log(bookId)
        try {
            const response = await fetch(`/api/library/start/${bookId}`, {
            method: 'PUT',
            credentials: 'include'
            });

            if (response.ok) {
                console.log('Entry updated successfully');
                document.location.reload();
            } else {
                const errorMessage = await response.json();
                console.error(errorMessage.message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
        modal.style.display = 'none';
    }
    
    if (clickedElement.classList.contains('btn-complete')) {
        const bookItem = clickedElement;
        const bookId = bookItem.parentElement.parentElement.parentElement.dataset.entryId;
        const modal = document.getElementById(`bookModal-${bookId}`);
        console.log(bookId)
        try {
            const response = await fetch(`/api/library/complete/${bookId}`, {
            method: 'PUT',
            credentials: 'include'
            });

            if (response.ok) {
                console.log('Entry updated successfully');
                document.location.reload();
            } else {
                const errorMessage = await response.json();
                console.error(errorMessage.message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
        modal.style.display = 'none';
    }

    if (clickedElement.classList.contains('btn-future')) {
        const bookItem = clickedElement;
        const bookId = bookItem.parentElement.parentElement.parentElement.dataset.entryId;
        const modal = document.getElementById(`bookModal-${bookId}`);
        console.log(bookId)
        try {
            const response = await fetch(`/api/library/future/${bookId}`, {
            method: 'PUT',
            credentials: 'include'
            });

            if (response.ok) {
                console.log('Entry updated successfully');
                document.location.reload();
            } else {
                const errorMessage = await response.json();
                console.error(errorMessage.message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
        modal.style.display = 'none';
    }
  
    // Check if the modal backdrop was clicked
    if (clickedElement.classList.contains('modal')) {
        const bookItem = clickedElement;
        const bookId = bookItem.parentElement.dataset.entryId;
        const modal = document.getElementById(`bookModal-${bookId}`);
        console.log(bookId)
        modal.style.display = 'none';
    }
  });

  