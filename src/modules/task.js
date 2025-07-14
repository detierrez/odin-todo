import PubSub from "./pubsub";

export class Task {
  instances = {};

  static publish = PubSub.subscribe(this);

  static add(task) {
    this.instances[task.uuid] = this;
    this.publish({ method: "create", object: task });
  }

  static update(task) {
    delete this.instances[task.uuid];
    this.publish({ method: "update", object: task });
  }

  static delete(task) {
    delete this.instances[task.uuid];
    this.publish({ method: "delete", object: task });
  }

  constructor({ title, description, dueDate, priority, userProject, uuid }) {
    this.title = title;
    this.description = description;
    this.dueDate = new Date(dueDate);
    this.priority = priority;
    this.userProject = userProject;
    this.isCompleted = false;
    this.uuid = uuid ? uuid : crypto.randomUUID();
    this.projects = [];

    Task.add(this);
  }

  delete() {
    Task.delete(this);
  }

  toJSON(key) {
    if (key) {
      return this.uuid;
    }
    return { className: this.constructor.name, parameters: { ...this } };
  }
}
