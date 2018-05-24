import { generateName } from './helpers.js';

class CatPhotoElement {
  constructor (photo, name, counter) {
    this.photo = photo;
    this.name = name;
    this.counter = counter;
    this.selfGlobalContainer = null;
  }

  updateCounter () {
    this.counter ++;
    let counterContainerTemporary = this.selfGlobalContainer.querySelector('.counter-container');
    counterContainerTemporary.innerHTML = '';
    counterContainerTemporary.innerHTML = this.renderCounter();
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
const header = document.querySelector('header');
globalContainer.innerHTML = '';
window.URL = window.URL || window.webkitURL;

let cats = [];
const numberOfCats = 9;

const maximumActiveCats = 4;
let currentActiveCats = 0;

(function createHeader () {
  let paragraph = `<p>You can select up to ${maximumActiveCats} kitties from a total of ${numberOfCats}.</p>`;
  header.innerHTML = '';
  header.innerHTML += paragraph;
})();

function createList () {
  for (let index = 0; index < numberOfCats; index ++) {

    cats.push(new CatPhotoElement('#', generateName(), 0));

    let spinnerTemplate = '<div class="loading-container"><div class="loading"></div></div>';
    let container = document.createElement('div');
    container.classList.add('container');
    container.innerHTML = '';
    container.innerHTML += spinnerTemplate;
    listContainer.appendChild(container);

    fetchCatPhoto(cats[index], container);

    listenAndRender(cats[index], container);
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

function listenAndRender (catObject, container) {
  container.addEventListener('click', (event) => {
    if (event.target && event.target.matches('img')) {
      let clickedPhoto = event.target;
      if (!clickedPhoto.classList.contains('selected') && currentActiveCats < maximumActiveCats) {
        currentActiveCats ++;
        clickedPhoto.classList.add('selected');
        renderGlobal(catObject);
      } else if (clickedPhoto.classList.contains('selected')) {
        currentActiveCats --;
        clickedPhoto.classList.remove('selected');
        unrenderGlobal(catObject);
      }
    }
  });
}

function renderGlobal (catObject) {
  let container = document.createElement('div');
  container.classList.add('container');
  container.innerHTML = '';
  container.innerHTML += catObject.renderPhoto();
  container.innerHTML += catObject.renderCounter();
  catObject.selfGlobalContainer = container;
  globalContainer.appendChild(container);
  listenAndCount(catObject);
}

function unrenderGlobal (catObject) {
  catObject.selfGlobalContainer.remove();
}

function listenAndCount (catObject) {
  catObject.selfGlobalContainer.addEventListener('click', (event) => {
    catObject.updateCounter();
  })
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
