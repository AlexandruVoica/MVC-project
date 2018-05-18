const globalContainer = document.querySelector('.container');
const photoContainer = document.querySelector('.photo-container');
const counterContainer = document.querySelector('.counter-container');

function fetchCatPhoto () {
  const catApiUrl = 'http://thecatapi.com/api/images/get?format=src';
  fetch(catApiUrl)
  .then(response => response.text())
  .then(addImage);
}

function addImage (link) {
  let imgElement = `<img src=${link} alt="cute kitty"`;
  photoContainer.innerHTML = '';
  photoContainer.innerHTML += imgElement;
}

fetchCatPhoto();
