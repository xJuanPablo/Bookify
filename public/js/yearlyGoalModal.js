const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('modal');
const submitBtn = document.getElementById('submitBtn');
const yearlyGoalInput = document.getElementById('yearlyGoalInput');
const closeModal = document.getElementById('closeModal');

const openModalBtn1 = document.getElementById('openModalBtn1');
const modal1 = document.getElementById('modal1');
const submitBtn1 = document.getElementById('submitBtn1');
const pagesReadInput = document.getElementById('pagesReadInput');
const closeModal1 = document.getElementById('closeModal1');

openModalBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
});

submitBtn.addEventListener('click', async () => {
  const userGoal = yearlyGoalInput.value;
  if (userGoal) {
    const response = await fetch('/api/users/yearlyGoal', {
        method: 'PUT',
        body: JSON.stringify({ userGoal }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok){
        window.location.reload()
      }
    modal.style.display = 'none';
    yearlyGoalInput.value = '';
  }
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.onclick = function(event) {
  if (event.target == modal || event.target == modal1) {
    modal.style.display = "none";
    modal1.style.display = "none";
  }
}

openModalBtn1.addEventListener('click', () => {
  modal1.style.display = 'flex';
});

submitBtn1.addEventListener('click', async () => {
  const pages_read = parseFloat(pagesReadInput.value);
  const dateGrab = new Date();
  const date = dateGrab.toISOString().split('T')[0];
  if (!isNaN(pages_read)) {
    const response = await fetch('/api/entry', {
        method: 'POST',
        body: JSON.stringify({ pages_read, date }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok){
        const responseData = await response.json();
        console.log(responseData)
        window.location.reload()
      }
    modal.style.display = 'none';
    pagesReadInput.value = '';
  }
});

closeModal1.addEventListener('click', () => {
    modal1.style.display = 'none';
});