import { Task } from "./task";
import { Collection, Project } from "./project";
import Storage from "./storage";

class Application {
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
    Task.remove(task.id);
    Storage.remove(task);
    const allProjects = Project.getAll();
    for (const project of allProjects) {
      project.remove(task.id);
    }
  }

  createProject(args) {
    const project = new Project(args);
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

  addTaskToProject(taskId, projectId) {
    const task = Task.get(taskId);
    const projectToBeAssigned = Project.get(projectId);
    const allProjects = Project.getAll();
    for (const project of allProjects) {
      if (project === projectToBeAssigned) {
        project.add(task.id);
      } else {
        project.remove(task.id);
      }
    }
  }

  removeTaskFromProject(taskId, projectId) {
    const task = Task.get(taskId);
    const project = Project.get(projectId);
    project.remove(task);
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
}

const app = new Application();

export default app;
