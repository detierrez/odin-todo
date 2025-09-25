import { Task } from "./task";
import {
  Collection,
  Project,
  TodayCollection,
  TomorrowCollection,
  WeekCollection,
} from "./project";
import Storage from "./storage";
import "./initializer";

class Application {
  constructor() {}

  createTask(args) {
    const task = Task.create(args);
    Storage.save(task);
    return task;
  }

  getTask(id) {
    return Task.get(id);
  }

  getTasks() {
    return Task.getAll();
  }

  updateTask(id, updates) {
    const task = Task.get(id);
    for (const [property, value] of Object.entries(updates)) {
      task[property] = value;
    }
    Storage.save(task);
    return task;
  }

  deleteTask(id) {
    const task = Task.get(id);
    console.log(id);
    Task.remove(task.id);
    Storage.remove(task);
    const allProjects = Project.getAll();
    for (const project of allProjects) {
      if (project.has(task.id)) {
        project.remove(task.id);
        Storage.save(project);
      }
    }
  }

  createProject(args) {
    const project = Project.create(args);
    Storage.save(project);
    return project;
  }

  getProject(id) {
    const project = Project.get(id);

    return project;
  }

  getProjects() {
    return Project.getAll();
  }

  updateProject(id, updates) {
    const project = Project.get(id);
    for (const [property, value] of Object.entries(updates)) {
      project[property] = value;
    }
    Storage.save(project);
    return project;
  }

  addTaskToProject(taskId, projectId) {
    const task = Task.get(taskId);
    const targetProject = Project.get(projectId);
    const allProjects = Project.getAll();
    for (const project of allProjects) {
      if (project === targetProject) {
        project.add(task.id);
        Storage.save(project);
      } else if (project.has(task.id)) {
        project.remove(task.id);
        Storage.save(project);
      }
    }
  }

  removeTaskFromProject(taskId, projectId) {
    const task = Task.get(taskId);
    const project = Project.get(projectId);
    project.remove(task);
    Storage.save(project);
  }

  deleteProject(id) {
    const project = Project.get(id);
    for (const task of project.tasks) {
      Task.remove(task.id);
      Storage.remove(task);
    }
    Project.remove(project.id);
    Storage.remove(project);
  }

  collectionClassById = {
    all: Collection,
    today: TodayCollection,
    tomorrow: TomorrowCollection,
    thisweek: WeekCollection,
  };

  getCollection(id) {
    return new this.collectionClassById[id]();
  }

  getCollections() {
    const collections = [
      new Collection(),
      new TodayCollection(),
      new TomorrowCollection(),
      new WeekCollection(),
    ];

    return collections;
  }

  isProject(collection) {
    return collection instanceof Project;
  }
}

const app = new Application();

export default app;
