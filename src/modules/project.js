import {
  addWeeks,
  endOfDay,
  endOfToday,
  endOfTomorrow,
  isWithinInterval,
  startOfToday,
  startOfTomorrow,
} from "date-fns";

export class Project {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.uuid = crypto.randomUUID();
    this.tasks = [];
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

  removeTask(uuid) {
    delete this.tasks[uuid];
  }

  addTask(task) {
    if (this.filterRule(task)) {
      this.tasks.push(task);
    }
  }

  filterRule(task) {
    return true;
  }
}

export class UserProject extends Project {
  constructor(title, description) {
    super(title, description);
  }

  filterRule(task) {
    return task.userProject === this.title;
  }
}

export class TimeProject extends Project {
  constructor(title, description) {
    super(title, description);
  }

  filterRule(task) {
    return isWithinInterval(task.dueDate, this.timeInterval);
  }

  get timeInterval() {
    return null;
  }
}

export class TodayProject extends TimeProject {
  constructor(title, description) {
    super(title, description);
  }

  get timeInterval() {
    return {
      start: startOfToday(),
      end: endOfToday(),
    };
  }
}

export class TomorrowProject extends TimeProject {
  constructor(title, description) {
    super(title, description);
  }

  get timeInterval() {
    return {
      start: startOfTomorrow(),
      end: endOfTomorrow(),
    };
  }
}

export class WeekProject extends TimeProject {
  constructor(title, description) {
    super(title, description);
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
