function makeClassIndexer(targetClass) {
  targetClass.instancesById = {};

  targetClass.create = function (args) {
    const newInstance = new this(args);
    this.instancesById[newInstance.id] = newInstance;
    return newInstance;
  };

  targetClass.get = function (id) {
    return this.instancesById[id];
  };

  targetClass.getAll = function () {
    return Object.values(this.instancesById);
  };

  targetClass.remove = function (id) {
    delete this.instancesById[id];
  };
}

export default makeClassIndexer;

// class Example {
//   constructor({ foo = "Hello", bar = "World" } = {}) {
//     this.id = crypto.randomUUID();
//     this.foo = foo;
//     this.bar = bar;
//   }
// }

// Object.assign(Example, IndexingObject);

// const createdinstance = Example.create({ foo: "hi", bar: "planet" });
// const gottenInstance = Example.get(createdinstance.id);
// const allInstances = Example.getAll();

// console.dir(Example);
// console.dir({ createdinstance, gottenInstance, allInstances });
