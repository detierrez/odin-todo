import {
  addWeeks,
  endOfDay,
  endOfToday,
  endOfTomorrow,
  isWithinInterval,
  startOfToday,
  startOfTomorrow,
} from "date-fns";

import { v4 as uuidv4 } from "uuid";
import { Task } from "./task";
import makeClassIndexer from "./indexer";

export class Collection {
  constructor({
    id = "all",
    title = "Inbox",
    description = "All of your tasks",
  } = {}) {
    this.id = id;
    this.title = title;
    this.description = description;
  }

  get tasks() {
    return Task.getAll();
  }

  get totalCompleted() {
    let count = 0;
    for (const task of this.tasks) {
      count += +task.isCompleted;
    }
    return count;
  }

  get totalPending() {
    let count = 0;
    for (const task of this.tasks) {
      count += +!task.isCompleted;
    }
    return count;
  }
}

export class Project extends Collection {
  constructor({ id = uuidv4(), title = "", description, ownedTasksIds }) {
    super({ id, title, description });
    this.ownedTasksIds = new Set(ownedTasksIds);
  }

  get tasks() {
    const ids = Array.from(this.ownedTasksIds);
    return ids.map((id) => Task.get(id));
  }

  add(taskId) {
    this.ownedTasksIds.add(taskId);
  }

  has(taskId) {
    return this.ownedTasksIds.has(taskId);
  }

  remove(taskId) {
    this.ownedTasksIds.delete(taskId);
  }

  toJSON() {
    const itemArguments = {
      title: this.title,
      description: this.description,
      id: this.id,
      ownedTasksIds: this.tasks.map((task) => task.id),
    };
    // return { className: this.constructor.name, parameters: { ...this } };
    return { itemClass: this.constructor.name, itemArguments };
  }
}

makeClassIndexer(Project);

export class TimeCollection extends Collection {
  constructor(title, description, id) {
    super(title, description, id);
  }

  get tasks() {
    return Task.getAll().filter((task) =>
      isWithinInterval(task.dueDate, this.timeInterval),
    );
  }

  get timeInterval() {
    return null;
  }
}

export class TodayCollection extends TimeCollection {
  constructor({
    title = "Today",
    description = "Everything due today",
    id = "today",
  } = {}) {
    super({ title, description, id });
  }

  get timeInterval() {
    return {
      start: startOfToday(),
      end: endOfToday(),
    };
  }
}

export class TomorrowCollection extends TimeCollection {
  constructor({
    title = "Tomorrow",
    description = "To do tomorrow",
    id = "tomorrow",
  } = {}) {
    super({ title, description, id });
  }

  get timeInterval() {
    return {
      start: startOfTomorrow(),
      end: endOfTomorrow(),
    };
  }
}

export class WeekCollection extends TimeCollection {
  constructor({
    title = "This Week",
    description = "What's to be done this week",
    id = "thisweek",
  } = {}) {
    super({ title, description, id });
  }

  get timeInterval() {
    const today = startOfToday();
    const nextWeek = addWeeks(today, 1);
    return {
      start: today,
      end: endOfDay(nextWeek),
    };
  }
}
