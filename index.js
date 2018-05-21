import generateName from 'helpers.js';

window.onload = function () {
  const templateElement = `<div class="container">
                            <div class="photo-container"></div>
                            <div class="counter-container"></div>
                          </div>`;

  const photoContainer = document.querySelector('.photo-container');

  // TODO: refactor the whole cat photo method

  function fetchCatPhoto () {
    const catApiUrl = 'https://cataas.com/cat';
    fetch(catApiUrl)
      .then(response => response.blob())
      .then(addPhoto);
  }

  function addPhoto (image) {
    let link = URL.createObjectURL(image);
    let imgElement = `<img src="${link}" alt="cute kitty">`;
    const photoContainer = document.querySelector('.photo-container');
    photoContainer.innerHTML = '';
    photoContainer.innerHTML += imgElement;
  }

  fetchCatPhoto();

  function addCounter () {
    const counterContainer = document.querySelector('.counter-container');
    const templateCounter = `<h6>${generateName()}
                             <h1 class="counter">0</h1>
                             <h6>times clicked</h6>`;
    counterContainer.innerHTML = '';
    counterContainer.innerHTML += templateCounter;
  }

  addCounter();

  photoContainer.addEventListener('click', function(event) {
    event.preventDefault();
    const counter = document.querySelector('.counter');
    let counterValue = counter.textContent;
    counterValue ++;
    counter.textContent = counterValue;
  });
};