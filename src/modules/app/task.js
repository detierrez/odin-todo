import makeClassIndexer from "./indexer";
import { v4 as uuidv4 } from "uuid";

export class Task {
  constructor({
    id = uuidv4(),
    title = "Task title",
    description = "Task description",
    dueDate = new Date(),
    priority = "normal",
    isCompleted = false,
  } = {}) {
    this.id = id;
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

  toJSON() {
    return { itemClass: this.constructor.name, itemArguments: this.properties };
  }
}

makeClassIndexer(Task);
