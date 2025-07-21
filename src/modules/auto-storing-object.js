const AutoStoringObject = {
  defineAutoStoringProperties(properties) {
    for (const property of properties) {
      this.defineAutoStoringProperty(property);
    }
  },

  defineAutoStoringProperty(property) {
    Object.defineProperty(this, "_" + property, {
      value: this[property],
      writable: true,
      enumerable: false,
    });
    Object.defineProperty(this, property, {
      get() {
        return this["_" + property];
      },
      set(newValue) {
        this["_" + property] = newValue;
        this.saveInStorage();
      },
      enumerable: true,
    });
  },

  saveInStorage() {
    localStorage.setItem(this.id, JSON.stringify(this));
  },
};

export default AutoStoringObject;

// class ExampleObject {
//   constructor(name) {
//     this.id = "sad" || crypto.randomUUID();
//     this.name = name;
//     this.desc = "asd";

//     this.defineAutoStoringProperties(["id", "name", "desc"]);
//   }
// }

// Object.assign(ExampleObject.prototype, AutoStoringObject);

// const selfSaver = new ExampleObject("John");
// selfSaver.name = "Doemil";
// selfSaver.desc = "description";
// console.log(selfSaver.name);
