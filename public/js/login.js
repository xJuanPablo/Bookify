const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  const username = document.querySelector('#email-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, username }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const responseData = await response.json();
      const username = responseData.username;
      document.location.replace(`/profile/${username}`);
    } else {
      alert('Failed to log in.');
    }
  }
};
  
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
  
  