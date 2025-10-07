import { Task } from "./task";
import { Project } from "./project";

import demoData from "./demo-data";

// localStorage.clear();

if (localStorage.length === 0) {
  for (const itemClass in demoData) {
    for (const itemArguments of demoData[itemClass]) {
      localStorage.setItem(
        itemArguments.id,
        JSON.stringify({ itemClass, itemArguments }),
      );
    }
  }

  localStorage.setItem("demoDataLoaded", "true");
}

let classesToLoad = [Task, Project];
classesToLoad = classesToLoad.reduce(
  (acc, Class) => ({ ...acc, [Class.name]: Class }),
  {},
);

const storedItems = Object.values({ ...localStorage });
for (const item of storedItems) {
  const { itemClass, itemArguments } = JSON.parse(item);
  const Class = classesToLoad[itemClass];
  if (Class) {
    Class.create(itemArguments);
  }
}
