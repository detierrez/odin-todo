import Storage from "./storage";

export class Task {
  static autoStoredProperties = ["id", "title", "description"];

  static tasksById = {};

  static getTask(id) {
    return this.tasksById[id];
  }

  static getTasks() {
    return Object.values(this.tasksById);
  }

  static add(task) {
    this.tasksById[task.id] = task;
  }

  static remove(task) {
    delete this.tasksById[task.id];
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

    Task.add(this);
    Storage.bind(this, Task.autoStoredProperties);
  }
 
  delete() {
    Task.remove(this);
    Storage.remove(this);
    this.project.remove(this);
  }

  get project() {
    return this._project;
  }

  set project(newProject) {
    const oldProject = this._project;
    if (oldProject === newProject) return;

    this._project = newProject;
    if (oldProject) oldProject.remove(this);
    if (newProject) newProject.add(this);
  }

  toJSON(key) {
    const parameters = {
      id: this.id,
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      priority: this.priority,
      isCompleted: this.isCompleted,
    };
    return { className: this.constructor.name, parameters };
  }
}
