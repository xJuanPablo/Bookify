const bookList = document.getElementById('book-list'); 
const entryId = '';

bookList.addEventListener('click', async (event) => {
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