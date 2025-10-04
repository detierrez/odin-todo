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
  {
    id: "t7",
    title: "Plan vacation",
    description: "Research destinations and book flights",
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    priority: "Medium",
    isCompleted: false,
  },
  {
    id: "t8",
    title: "Finish project report",
    description: "Complete and submit the final report",
    dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    priority: "High",
    isCompleted: false,
  },
  {
    id: "t9",
    title: "Clean kitchen",
    description: "Wipe surfaces and mop floor",
    dueDate: new Date(Date.now() + 0 * 24 * 60 * 60 * 1000),
    priority: "Low",
    isCompleted: false,
  },
  {
    id: "t10",
    title: "Practice coding",
    description: "Solve 3 algorithm problems",
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    priority: "Medium",
    isCompleted: false,
  },
  {
    id: "t11",
    title: "Doctor appointment",
    description: "Annual check-up at 10am",
    dueDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
    priority: "High",
    isCompleted: false,
  },
  {
    id: "t12",
    title: "Update resume",
    description: "Add recent experience and skills",
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    priority: "Medium",
    isCompleted: false,
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
      "t7",
      "t9",
    ],
  },
  {
    id: "p2",
    title: "Learning",
    description: "Tasks related to learning and self-improvement",
    ownedTasksIds: [
      "t2",
      "t10",
      "t12",
    ],
  },
  {
    id: "p3",
    title: "Health",
    description: "Health and wellness related tasks",
    ownedTasksIds: [
      "t3",
      "t6",
      "t11",
    ],
  },
  {
    id: "p4",
    title: "Work",
    description: "Professional and career-related tasks",
    ownedTasksIds: [
      "t8",
      "t12",
    ],
  },
  {
    id: "p5",
    title: "Home",
    description: "Household chores and maintenance",
    ownedTasksIds: [
      "t5",
      "t9",
    ],
  },
];

// const projects = [
//   {
//     id: "p1",
//     title: "Personal",
//     description: "Personal tasks and reminders",
//     ownedTasksIds: [
//       "t1",
//       "t4",
//       "t5",
//     ],
//   },
//   {
//     id: "p2",
//     title: "Learning",
//     description: "Tasks related to learning and self-improvement",
//     ownedTasksIds: ["t2"],
//   },
//   {
//     id: "p3",
//     title: "Health",
//     description: "Health and wellness related tasks",
//     ownedTasksIds: [
//       "t3",
//       "t6",
//     ],
//   },
// ];

const demoData = { Task: tasks, Project: projects };
export default demoData;
