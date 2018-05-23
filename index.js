import { generateName } from './helpers.js';

class CatPhotoElement {
  constructor (photo, name, counter) {
    this.photo = photo;
    this.name = name;
    this.counter = counter;
  }

  increaseCounter () {
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

window.onload = function () {
  const globalContainer = document.querySelector('.global-container');
  globalContainer.innerHTML = '';

  let cats = [];
  const numberOfCats = 9;

  for (let index = 0; index < numberOfCats; index ++) {
    // globalContainer.innerHTML += templateElement

    cats.push(new CatPhotoElement(fetchCatPhoto(), generateName(), 0));

    let container = document.createElement('div');
    container.classList.add('container');
    container.innerHTML = '';
    populate(container);
    globalContainer.appendChild(container);
  }

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
              let link = URL.createObjectURL(blob);
              return link;
              // let img = `<img src="${link}" alt="cute kitty">`;
              // let newElement = `<div class="photo-container">${img}</div>`;
              // container.innerHTML += newElement;
            });
  }

  function addCounter (container) {
    let info = `<h6 class="name">${generateName()}</h6>
                <h1 class="counter">0</h1>
                <h6>times clicked</h6>`;
    let newElement = `<div class="counter-container">${info}</div>`;
    container.innerHTML += newElement;
  }

  function listen (container) {
    const photoContainer = container.querySelector('.photo-container');
    const counterContainer = container.querySelector('.counter-container');
    photoContainer.addEventListener('click', function(event) {
      event.preventDefault();
      const counter = counterContainer.querySelector('.counter');
      let counterValue = counter.textContent;
      counterValue ++;
      counter.textContent = counterValue;
    });
  }


};