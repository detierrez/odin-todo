import { Task } from "./task";
import { UserProject, Project } from "./project";
import loadItemsByClass from "./dataLoader";

const storedClasses = [Task, UserProject];

const itemsByClass = loadItemsByClass(storedClasses);

for (const _class of storedClasses) {
  const itemArguments = Object.values(itemsByClass[_class.name]);
  for (const args of itemArguments) {
    new _class(args);
  }
}

for (const id in Project.instances) {
  const instance = Project.instances[id];
  console.log({
    instance,
    completed: instance.totalCompleted,
    tasks: instance.tasks,
  });
}
