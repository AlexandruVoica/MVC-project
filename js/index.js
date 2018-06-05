import { Model, Controller, View, Component } from './generic-classes.js';
import { generateName } from './helpers.js';

const root = document.querySelector('#root');

// -------------------- Cat Component ------------------------

class CatModel extends Model {
  constructor () {
    super();
    this.photo = '';
    // TODO: research more on Promises
    // specifically how to return values outside of Promise scopes
    this.fetchPhoto();
    this.name = generateName();
    this.counter = 0;
    this.isSelectable = true;
    this.selected = false;
    this.level = 'Newborn';
  }

  fetchPhoto () {
    const catApiUrl = 'https://cataas.com/cat';
    fetch(catApiUrl)
      .then(response => response.blob())
      .then(blob => {
        this.photo = window.URL.createObjectURL(blob);
        // notifiy all observers
        this.emit('Photo has been fetched.');
      });
  }

  incrementCounter () {
    this.counter ++;
    this.computeLevel();
    this.emit('counter');
  }

  computeLevel () {
    if (this.counter <= 10) {
      this.level = 'Newborn';
    } else if (this.counter <= 20) {
      this.level = 'Infant';
    } else if (this.counter <= 30) {
      this.level = 'Child';
    } else if (this.counter <= 50) {
      this.level = 'Squire';
    } else if (this.counter <= 100) {
      this.level = 'Warrior';
    } else if (this.counter <= 200) {
      this.level = 'Wizard';
    } else if (this.counter <= 300) {
      this.level = 'Sage';
    } else if (this.counter <= 500) {
      this.level = 'Ninja';
    }
  }

  toggleSelected () {
    // if cat is already selected
    if (this.selected) {
      this.selected = false;
      // notify observers (view)
      this.emit('deselected');
      // notify other components
      broker.publish('catSelectionEvents', this);
    } else {
      // if cat is not selected
      // check if it is selectable
      if (this.isSelectable) {
        this.selected = true;
        // notify observers (view)
        this.emit('selected');
        // notify other components
        broker.publish('catSelectionEvents', this);
      }
    }
  }

  setIsSelectable (value) {
    this.isSelectable = value;
  }
}

class CatControllerInList extends Controller {
  constructor (model, view) {
    super(model, view);
    this.initialize();
  }

  initialize () {
    const self = this;
    broker.addSubscriber('selectableEvents', function(value) {
      self.model.setIsSelectable(value);
    });
    this.view.photoContainer.addEventListener('click', function (event) {
      self.model.toggleSelected();
    });
  }
}

class CatControllerInStage extends Controller {
  constructor (model, view) {
    super(model, view);
    this.initialize();
  }

  initialize () {
    const self = this;
    this.view.photoContainer.addEventListener('click', function (event) {
      self.model.incrementCounter();
    });
  }
}

class CatView extends View {
  constructor (model, container) {
    super(model, container);
    // TODO: solve this with proxies
    this.initialize();
    this.model.addObserver(this);
  }

  initialize () {
    this.container = document.createElement('div');
    this.container.classList.add('container');
    this.container.innerHTML = `<div class="photo-container">
                                </div>
                                <div class="counter-container">
                                </div>
                                <div class="admin-container">
                                </div>`;
    this.photoContainer = this.container.querySelector('.photo-container');
    this.counterContainer = this.container.querySelector('.counter-container');
    this.adminContainer = this.container.querySelector('.admin-container')
    this.parent.appendChild(this.container);
    this.render();
  }

  notified (data) {
    if (data === 'counter') {
      this.renderCounter();
    } else {
      this.render();
    }
    console.log(data);
  }

  renderPhoto () {
    if (this.model.photo === '') {
      this.photoContainer.innerHTML = ` <div class="loading-container">
                                        <div class="loading"></div>
                                      </div>`;
    } else {
      this.photoContainer.innerHTML = `<img class="${this.model.selected ? 'selected' : ''}" src="${this.model.photo}" alt="cute kitty">`;
    }
  }

  renderCounter () {
    this.counterContainer.innerHTML = `<h6 class="name">${this.model.name}</h6>
                                       <h6 class="level">${this.model.level}</h6>
                                       <h1 class="counter">${this.model.counter}</h1>
                                       <h6>times clicked</h6>`;
  }

  renderAdmin () {
    this.adminContainer.innerHTML = '<button class="admin-button">Show admin panel</button>';
  }

  render () {
    this.renderPhoto();
    this.renderCounter();
    this.renderAdmin();
  }
}

// ---------------------- Cat List ----------------------

class CatListModel extends Model {
  constructor (argObject) {
    // I used the argObject instead of the built-in arguments object because I require the names of the arguments themselves
    super();
    this.cats = [];
    this.numberOfCats = argObject.numberOfCats || 1;
  }
}

class CatListController extends Controller {
  constructor (model, view) {
    super(model, view);
    this.initialize();
  }

  initialize () {
    this.buildList();
  }

  buildList () {
    const self = this;
    for (let index = 0; index < this.model.numberOfCats; index ++) {
      self.model.cats.push(new Component(CatModel, CatView, CatControllerInList, self.view.container, {}));
    }
  }
}

class CatListView extends View {
  constructor (model, container) {
    super(model, container);
    this.initialize();
  }

  initialize() {
    this.container = document.createElement('div');
    this.container.classList.add('list-container');
    this.container.innerHTML = '';
    this.parent.appendChild(this.container);
  }
}

// --------------- Cat Stage ----------------------

class CatStageModel extends Model {
  constructor (argObject) {
    super();
    this.catsOnStage = [];
    this.maximumNumberOfCats = argObject.maximumNumberOfCats || 1;
  }

  addCat (cat) {
   this.catsOnStage.push(cat);
  }

  removeCat (catModelToRemove) {
    let catComponentFound = this.searchCatByModel(catModelToRemove);
    if (catComponentFound) {
      // if Cat component is found, notify the view to remove that component from DOM
      this.emit(catComponentFound);
    }
    this.catsOnStage = this.catsOnStage.filter (cat => cat.model != catModelToRemove);
  }

  searchCatByModel (catModelToFind) {
    // return a cat component with the searched model
    return this.catsOnStage.filter(catComponent => catComponent.model === catModelToFind)[0];
  }
}

class CatStageController extends Controller {
  constructor (model, view) {
    super(model, view);
    this.initialize();
  }

  initialize () {
    const self = this;
    broker.addSubscriber('catSelectionEvents', function (cat) {
      if (cat.selected) {
        self.addCatToStage(cat);
      } else {
        self.removeCatFromStage(cat);
      }
    });
  }

  addCatToStage (catModel) {
    if (this.model.catsOnStage.length < this.model.maximumNumberOfCats) {
      let newCat = new Component(catModel, CatView, CatControllerInStage, this.view.container, {});
      this.model.addCat(newCat);
      if (this.model.catsOnStage.length === this.model.maximumNumberOfCats) {
        // notify Cat component models that no more components can be selected (equal with "notify all Cat components to switch isSelectable to false")
        broker.publish('selectableEvents', false);
      }
    }
  }

  removeCatFromStage (catModelToRemove) {
    this.model.removeCat(catModelToRemove);
    broker.publish('selectableEvents', true);
  }
}

class CatStageView extends View {
  constructor (model, container) {
    super(model, container);
    this.model.addObserver(this);
    this.initialize();
  }

  initialize () {
    this.container = document.createElement('div');
    this.container.classList.add('global-container');
    this.parent.appendChild(this.container);
  }

  notified (data) {
    this.container.removeChild(data.view.container);
  }

  render () {
    this.container.innerHTML = '';
    for (let cat in this.catsOnStage) {
      cat.view.render();
    }
  }
}

// ------------------ Message Broker ------------------

class MessageBroker {
  constructor () {
    this.destinations = {
      'catSelectionEvents': [],
      'selectableEvents': []
    };
  }

  addSubscriber (destination, callback) {
    console.log(destination, callback);
    if (!this.destinations.hasOwnProperty(destination)) {
      this.destinations[destination] = [];
    }
    this.destinations[destination].push(callback);
  }

  removeSubscriber (destination, callbackToRemove) {
    if (this.destinations.hasOwnProperty(destination)) {
      this.destinations[destination] = this.destinations[destination].filter(callback => callback != callbackToRemove);
    }
  }

  publish (destination, data) {
    console.log(destination, data);
    if (this.destinations.hasOwnProperty(destination)) {
      for (let subscriber of this.destinations[destination]) {
        subscriber(data);
      }
    }
  }
}

let broker = new MessageBroker ();
let catList = new Component(CatListModel, CatListView, CatListController, root, {
  // total number of cats in the list model
  numberOfCats: 9
});
let catStage = new Component(CatStageModel, CatStageView, CatStageController, root, {
  // maximum number of cats that can be on the stage at the same time
  maximumNumberOfCats: 4
});
