const storage = {};

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

export class Task {
  static memory = storage;
  instances = {};

  static delete(task) {
    delete this.instances[task.uuid];
    localStorage.removeItem(task.uuid);
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
