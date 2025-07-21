import {
  addWeeks,
  endOfDay,
  endOfToday,
  endOfTomorrow,
  isWithinInterval,
  startOfToday,
  startOfTomorrow,
} from "date-fns";

import { Task } from "./task";

export class Collection {
  static instances = {};

  static add(project) {
    this.instances[project.id] = project;
  }

  static get projects() {
    return Object.values(this.instances);
  }

  static getProject(id) {
    return this.instances[id];
  }

  constructor({ title, description, id }) {
    this.title = title;
    this.description = description;
    this.id = id || crypto.randomUUID();

    Collection.add(this);
  }

  get tasks() {
    return Object.values(Task.tasksById);
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
  constructor({ title, description, id, ownedTasksIds }) {
    super({ title, description, id });

    this.tasksById = {};
    for (const id of ownedTasksIds) {
      const task = Task.getTask(id);
      this.addTask(task);
    }
  }

  get tasks() {
    return Object.values(this.tasksById);
  }

  removeTask(task) {
    delete this.tasksById[task.id];
  }

  addTask(task) {
    if (task.id in this.tasksById) {
      return;
    }
    this.tasksById[task.id] = task;
    task.setProject(this);
  }

  toJSON(key) {
    const parameters = {
      title: this.title,
      description: this.description,
      id: this.id,
      ownedTasksIds: this.tasks.map((task) => task.id),
    };
    // return { className: this.constructor.name, parameters: { ...this } };
    return { className: this.constructor.name, parameters };
  }
}

export class TimeCollection extends Collection {
  constructor(title, description, id) {
    super(title, description, id);
  }

  get tasksById() {
    return Object.values(Task.tasksById).filter((task) =>
      isWithinInterval(task.dueDate, this.timeInterval)
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
  }) {
    super(title, description, id);
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
  }) {
    super(title, description, id);
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
  }) {
    super(title, description, id);
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
