import AutoStoringObject from "./auto-storing-object";

export class Task {
  static autoStoredProperties = ["id", "title", "description"];

  static tasksById = {};

  static getTask(id) {
    return this.tasksById[id];
  }

  static add(task) {
    this.tasksById[task.id] = task;
  }

  constructor({
    title = "Task title",
    description = "Task description",
    dueDate = new Date(),
    priority = "normal",
    isCompleted = false,
    id,
  } = {}) {
    this.id = id || crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = new Date(dueDate);
    this.priority = priority;
    this.isCompleted = isCompleted;

    this.project = null;

    this.defineAutoStoringProperties(["title", "description"]);
    Task.add(this);
  }

  delete() {
    Task.delete(this);
  }

  setProject(newProject) {
    if (this.project === newProject) return;
    if (this.project) this.removeProject();
    this.project = newProject;
    if (newProject) {
      newProject.addTask(this);
    }
  }

  removeProject() {
    this.project.removeTask(this);
    this.project = null;
  }

  saveInStorage() {
    localStorage.setItem(this.id, JSON.stringify(this));
  }

  toJSON(key) {
    // const itemArguments = {
    //   title: this.title,
    //   description: this.description,
    //   dueDate: this.dueDate,
    //   priority: this.priority,
    //   isCompleted: this.isCompleted,
    //   id: this.id,
    // };
    // return { className: this.constructor.name, parameters: { ...this } };
    return { className: this.constructor.name, itemArguments: {...this} };
  }
}

Object.assign(Task.prototype, AutoStoringObject);
