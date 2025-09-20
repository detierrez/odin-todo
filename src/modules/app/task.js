import makeClassIndexer from "./indexer";

export class Task {
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
  }

  get properties() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      priority: this.priority,
      isCompleted: this.isCompleted,
    };
  }

  toJSON(key) {
    return { itemClass: this.constructor.name, itemArguments: this.properties };
  }
}

makeClassIndexer(Task);

