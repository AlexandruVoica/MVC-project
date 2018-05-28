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
  constructor (model) {
    super();
    this.model = model;
  }

  initialize () {}

  render () {}
}

class Component {
  constructor (ModelClass, ViewClass, ControllerClass,argObjectForModel) {
    this.model = new ModelClass(argObjectForModel);
    this.view = new ViewClass(this.model);
    this.controller = new ControllerClass(this.model, this.view);
  }
}

export {
        Model,
        Controller,
        View,
        Component
      };