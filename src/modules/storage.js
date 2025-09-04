class Storage {
  static bind(item, properties) {
    if (!item.id) throw Error;

    for (const property of properties) {
      this.makePropertyToStoreItemWhenSet(item, property);
    }

    if (!localStorage.getItem(item.id)) this.save(item);
  }

  static makePropertyToStoreItemWhenSet(item, property) {
    Object.defineProperty(item, "_" + property, {
      enumerable: false,
      writable: true,
      value: item[property],
    });
    Object.defineProperty(item, property, {
      enumerable: true,
      get() {
        return item["_" + property];
      },
      set(newValue) {
        if (newValue === item[property]) return;
        item["_" + property] = newValue;
        Storage.save(item);
      },
    });
  }

  static save(item) {
    localStorage.setItem(item.id, JSON.stringify(item));
  }

  static remove(item) {
    localStorage.removeItem(item.id);
  }
}

export default Storage;

class Example {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.desc = "asd";

    Storage.bind(this, ["id", "name", "desc"]);
  }
}

// const example = new Example("John");
// example.name = "Doemil";
// example.desc = "xD";
// // Storage.remove(example);
// console.log(example);
