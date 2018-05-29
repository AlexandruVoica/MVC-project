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
      observer.notified(data);
    }
  }
}

// this Observer class is (mentally) equivalent to an interface
class Observer {
  constructor () {}

  notified (data) {
    return true;
  }
}

// ----------------------------------------------------

class Model extends Observable {
  constructor () {
    super();
  }
}

class Controller extends Observer {
  constructor (model, view) {
    super();
    this.model = model;
    this.view = view;
  }

  initialize () {}
}

// this View class is (mentally) equivalent to an interface
class View extends Observer {
  constructor (model, container) {
    super();
    this.model = model;
    this.parent = container;
  }

  initialize () {}

  render () {}
}

class Component {
  constructor (ModelClass, ViewClass, ControllerClass, container, argObjectForModel) {
    if (typeof(ModelClass) === 'function') {
      this.model = new ModelClass(argObjectForModel);
    } else {
      this.model = ModelClass;
    }

    this.view = new ViewClass(this.model, container);
    this.controller = new ControllerClass(this.model, this.view);


  }
}

export {
        Model,
        Controller,
        View,
        Component
      };