const tasks = [
  {
    id: "t1",
    title: "Buy groceries",
    description: "Milk, Bread, Eggs",
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    priority: "High",
    isCompleted: true,
  },
  {
    id: "t2",
    title: "Read book",
    description: "Finish reading 'Clean Code'",
    dueDate: new Date(Date.now() + 0 * 24 * 60 * 60 * 1000),
    priority: "Medium",
    isCompleted: false,
  },
  {
    id: "t3",
    title: "Workout",
    description: "30 minutes of cardio",
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    priority: "Low",
    isCompleted: true,
  },
  {
    id: "t4",
    title: "Call mom",
    description: "Check in and catch up",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    priority: "Medium",
    isCompleted: false,
  },
  {
    id: "t5",
    title: "Organize closet",
    description: "Sort clothes and donate unused items",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    priority: "Low",
    isCompleted: false,
  },
  {
    id: "t6",
    title: "Meditation",
    description: "10 minutes of mindfulness meditation",
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    priority: "High",
    isCompleted: true,
  },
];

const projects = [
  {
    id: "p1",
    title: "Personal",
    description: "Personal tasks and reminders",
    ownedTasksIds: [
      "t1",
      "t4",
      "t5",
    ],
  },
  {
    id: "p2",
    title: "Learning",
    description: "Tasks related to learning and self-improvement",
    ownedTasksIds: ["t2"],
  },
  {
    id: "p3",
    title: "Health",
    description: "Health and wellness related tasks",
    ownedTasksIds: [
      "t3",
      "t6",
    ],
  },
];

const demoData = { Task: tasks, Project: projects };
export default demoData;
