class Observable {
  constructor () {
    this.observers = [];
  }

  addObserver (observer) {
    this.observers.push(observer);
  }

  removeObserver (observerToRemove) {
    this.observers = this.observers.filter(observer => observer != observerToRemove);
  }

  emit (data) {
    for (let observer of this.observers) {
      observer.notify(data);
    }
  }
}

// this Observer class is (mentally) equivalent to an interface
class Observer {
  constructor () {}

  notify (data) {
    return true;
  }
}

class Model extends Observable {
  constructor () {
    super();
  }
}

class Collection extends Model {
  constructor () {
    super();
  }
}

class Controller {
  constructor (model, view) {
    this.model = model;
    this.view = view;
  }

  initialize () {
    this.view.initialize();
    // attach event listeners
    // ...
  }
}

class View extends Observer {
  constructor (controller) {
    super();
    this.controller = controller;
  }

  initialize () {

  }

  render () {

  }
}

class Component {
  constructor (model, view, controller) {
    this.model = model;
    this.view = view;
    this.controller = controller;
  }
}

let catListComponent = new Component();
let catStageComponent = new Component();

catListComponent.controller.initialize();
catListComponent.controller.initialize();

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