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

export class Project {
  static instances = {};

  static add(project) {
    this.instances[project.id] = project;
  }

  constructor({ title, description, id }) {
    this.title = title;
    this.description = description;
    this.id = id || crypto.randomUUID();

    Project.add(this);
  }

  get tasks() {
    return Object.values(Task.tasks);
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

  removeTask(task) {
    delete this.tasks[task.id];
  }

  addTask(task) {
    if (this.filterRule(task)) {
      this.tasks[task.id] = task;
    }
  }
}

export class UserProject extends Project {
  constructor({ title, description, id, ownedTasksIds }) {
    super({ title, description, id });
    console.log({ title, description, id, ownedTasksIds})
    this.ownedTasksIds = ownedTasksIds;
  }

  get tasks() {
    return this.ownedTasksIds.map((id) => Task.tasks[id]);
  }
}

export class TimeProject extends Project {
  constructor(title, description, id) {
    super(title, description, id);
  }

  get tasks() {
    return Object.values(Task.tasks).filter((task) =>
      isWithinInterval(task.dueDate, this.timeInterval)
    );
  }

  get timeInterval() {
    return null;
  }
}

export class TodayProject extends TimeProject {
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

export class TomorrowProject extends TimeProject {
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

export class WeekProject extends TimeProject {
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

// const today = startOfToday();
// const nextWeek = addWeeks(today, 1);
// console.table({ today, nextWeek });

// const todayProject = new TodayProject("Today", "Tasks due today");
// const tomorrowProject = new TomorrowProject("Tomorrow", "Tasks due tomorrow");
// const weekProject = new WeekProject("This Week", "Tasks due this week");

// const todayTask = { dueDate: new Date() };
// const tomorrowTask = { dueDate: addDays(new Date(), 1) };

// todayProject.addTask(todayTask);
// tomorrowProject.addTask(todayTask);
// weekProject.addTask(todayTask);

// todayProject.addTask(tomorrowTask);
// tomorrowProject.addTask(tomorrowTask);
// weekProject.addTask(tomorrowTask);

// console.log("TodayProject tasks:", todayProject.tasks);
// console.log("TomorrowProject tasks:", tomorrowProject.tasks);
// console.log("WeekProject tasks:", weekProject.tasks);
