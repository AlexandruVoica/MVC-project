import { generateName } from './helpers.js';

class CatPhotoElement {
  constructor (photo, name, counter) {
    this.photo = photo;
    this.name = name;
    this.counter = counter;
    this.isVisible = false;
  }

  incrementCounter () {
    this.counter ++;
  }

  renderPhoto () {
    return `<div class="photo-container">
              <img src="${this.photo}" alt="cute kitty">
            </div>`;
  }

  renderCounter () {
    return `<div class="counter-container">
              <h6 class="name">${this.name}</h6>
              <h1 class="counter">${this.counter}</h1>
              <h6>times clicked</h6>
            </div>`;
  }
}

const globalContainer = document.querySelector('.global-container');
const listContainer = document.querySelector('.list-container');
globalContainer.innerHTML = '';
window.URL = window.URL || window.webkitURL;

let cats = [];

function createList () {
  const numberOfCats = 9;

  for (let index = 0; index < numberOfCats; index ++) {

    cats.push(new CatPhotoElement('#', generateName(), 0));

    let spinnerTemplate = '<div class="loading-container"><div class="loading"></div></div>';
    let container = document.createElement('div');
    container.classList.add('container');
    container.innerHTML = '';
    container.innerHTML += spinnerTemplate;
    listContainer.appendChild(container);

    fetchCatPhoto(cats[index], container);
  }
}

createList();

function fetchCatPhoto (catObject, container) {
  const catApiUrl = 'https://cataas.com/cat';
  fetch(catApiUrl)
  .then(response => response.blob())
  .then(blob => {
    catObject.photo = window.URL.createObjectURL(blob);
    container.innerHTML = '';
    container.innerHTML += catObject.renderPhoto();
  });
}

// function listen (container) {
//   const photoContainer = container.querySelector('.photo-container');
//   const counterContainer = container.querySelector('.counter-container');
//   photoContainer.addEventListener('click', function(event) {
//     event.preventDefault();
//     const counter = counterContainer.querySelector('.counter');
//     let counterValue = counter.textContent;
//     counterValue ++;
//     counter.textContent = counterValue;
//   });
// }
