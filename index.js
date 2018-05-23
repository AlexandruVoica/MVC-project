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

async function createList () {
  const numberOfCats = 9;

  for (let index = 0; index < numberOfCats; index ++) {
    let photoUrl = '';
    let fetchPromise = fetchCatPhoto();
    await fetchPromise.then(link => {
      photoUrl = link;
    });

    cats.push(new CatPhotoElement(photoUrl, generateName(), 0));

    let container = document.createElement('div');
    container.classList.add('container');
    container.innerHTML = '';
    container.innerHTML += cats[index].renderPhoto();
    listContainer.appendChild(container);
  }
}

createList();

// async function populate (container) {
//   await addPhoto(container);
//   addCounter(container);
//   listen(container);
// }

function fetchCatPhoto () {
  const catApiUrl = 'https://cataas.com/cat';
  return fetch(catApiUrl)
  .then(response => response.blob())
  .then(blob => {
    return window.URL.createObjectURL(blob);
    // return link;
    // let img = `<img src="${link}" alt="cute kitty">`;
    // let newElement = `<div class="photo-container">${img}</div>`;
    // container.innerHTML += newElement;
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
