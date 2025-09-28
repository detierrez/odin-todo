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