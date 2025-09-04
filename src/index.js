import "modern-normalize";
import "./css/reset.css";


import "./modules/initializer";

import { Task } from "./modules/task";

const task = Task.getTasks()[0]; 
task.title = "EUREKA";
task.delete();
