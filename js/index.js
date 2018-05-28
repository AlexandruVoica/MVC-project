import { Model, Controller, View, Component } from './generic-classes';
import { generateName } from './helpers.js';

const root = document.querySelector('.root');

class CatModel extends Model {
  constructor () {
    super();
    this.photo = '';
    // need to research more on Promises
    // specifically how to return values outside of Promise scopes
    this.fetchPhoto();
    this.name = generateName();
    this.counter = 0;
  }

  fetchPhoto () {
    const catApiUrl = 'https://cataas.com/cat';
    fetch(catApiUrl)
      .then(response => response.blob())
      .then(blob => {
        this.photo = window.URL.createObjectURL(blob);
      });
  }
}

class CatController extends Controller {
  constructor (model, view) {
    super(model, view);
  }

  initialize (parent) {
    this.view.initialize(parent);
  }
}

class CatView extends View {
  constructor (model) {
    super(model);
    // TODO: solve this with proxies
    this.model.addObserver (this);
  }

  initialize () {
    this.container = document.createElement('div');
    this.container.classList.add('container');
    this.container.innerHTML = '';
    this.container.innerHTML = `<div class="photo-container">
              <div class="loading-container">
                <div class="loading"></div>
              </div>
            </div>`;
  }

  notified () {

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

  render () {
    return this.renderPhoto() + this.renderCounter();
  }
}

class CatListModel extends Model {
  constructor (argObject) {
    // I used the argObject instead of the built-in arguments object because I require the names of the arguments themselves
    super();
    this.cats = [];
    for (let arg in argObject) {
      if (arg === 'numberOfCats') {
        this.numberOfCats = argObject[arg];
        break;
      } else {
        this.numberOfCats = 1;
      }
    }
  }
}

class CatListController extends Controller {
  constructor (model, view) {
    super(model, view);
  }

  initialize () {
    this.buildList();
    this.view.render();
  }

  buildList () {
    const self = this;
    for (let index = 0; index < this.model.numberOfCats; index ++) {
      self.model.cats.push(new Component(CatModel, CatView, CatController, {}));
    }
  }
}

class CatListView extends View {
  constructor (model) {
    super(model);
  }

  initialize() {
    let listContainer = document.createElement('div');
    listContainer.classList.add('list-container');
    listContainer.innerHTML = '';
    root.appendChild(listContainer);
  }
}

let catList = new Component(CatListModel, CatListView, CatListController, {
  numberOfCats: 9
});





// class Cat {
//   constructor (photo, name, counter) {
//     this.photo = photo;
//     this.name = name;
//     this.counter = counter;
//     this.selfGlobalContainer = null;
//   }

// class CatList extends ModelObservable {
//   constructor (photo, name, counter) {
//     super();
//     this.photo = photo;
//     this.name = name;
//     this.counter = counter;
//     this.selfGlobalContainer = null;
//   }

//   incrementCounter () {
//     this.counter ++;
//   }
// }

// class CatEventObservable {
//   constructor () {
//     this.observers = [];
//   }

//   addObserver (CatEventObserver) {
//     this.observers.push(CatEventObserver);
//   }

//   emitEvent (event) {
//     this.observers.forEach((observer) => observer.catStateChanged(event));
//   }
// }

// class CatModelObserver {
//   constructor () {

//   }

//   catModelChanged () {

//   }
// }

// class CatView extends CatModelObserver {
//   constructor (container, model) {
//     super();
//     this.container = container;
//     this.model = model;
//   }

//   catModelChanged () {
//     this.render();
//   }

//   getPhoto () {
//     // return an img src
//   }

//   getContainer () {
//     // return a div
//   }

//   getCounter () {

//   }

//   _renderPhoto () {
//     this.container.innerHTML = `<div class="photo-container">
//                                   <img src="${this.model.photoUrl}" alt="cute kitty">
//                                 </div>`;
//   }

//   _renderCounter () {

//   }

//   render () {
//     this._renderPhoto();
//     this._renderCounter();
//   }
// }

// class CatEventObserver {
//   constructor () {

//   }

//   catStateChanged (event) {

//   }
// }

// class CatEventObservable {
//   constructor () {
//     this.observers = [];
//   }

//   addObserver (CatEventObserver) {
//     this.observers.push(CatEventObserver);
//   }

//   emitEvent (event) {
//     this.observers.forEach((observer) => observer.catStateChanged(event));
//   }
// }

// class CatController extends CatEventObservable {
//   constructor (model, view) {
//     super();
//     this.model = model;
//     this.view = view;
//   }

//   _click () {
//     let currentView = this.view;
//     currentView.getPhoto().addEventListener('click', function() {
//       currentView.toggleSelected();
//     });
//   }
// }

// class CatStage extends CatEventObserver {
//   constructor () {

//   }
// }