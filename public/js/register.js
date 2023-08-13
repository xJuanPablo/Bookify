const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const firstName = document.querySelector('#first_name').value.trim();
    const lastName = document.querySelector('#last_name').value.trim();
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    const confirmPassword = document.querySelector('#confirm_password').value.trim();
    
    if (password === confirmPassword) {
        if (username && email && password && firstName && lastName) {
            const response = await fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify({ username, email, password, firstName, lastName }),
                headers: { 'Content-Type': 'application/json' },
            });
        
            if (response.ok) {
                const responseData = await response.json();
                const username = responseData.username;
                document.location.replace(`/profile/${username}`);
            } else {
                alert('Failed to sign up.');
            }
        }
    } else {
        alert('Passwords dont match!');
    }
  };
  
  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);