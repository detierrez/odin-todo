class Storage {
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
