import PubSub from "./pubsub";

export class Task {
  static tasks = {};

  static getTask(id) {
    return this.tasks[id]
  }

  static add(task) {
    this.tasks[task.id] = task;
  }

  constructor({ title, description, dueDate, priority, userProject, isCompleted, id }) {
    this.title = title;
    this.description = description;
    this.dueDate = new Date(dueDate);
    this.priority = priority;
    this.userProject = userProject;
    this.isCompleted = isCompleted;
    this.id = id || crypto.randomUUID();

    Task.add(this);
  }

  delete() {
    Task.delete(this);
  }

  toJSON(key) {
    if (key) {
      return this.id;
    }
    return { className: this.constructor.name, parameters: { ...this } };
  }
}
