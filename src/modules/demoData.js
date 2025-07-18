const tasks = [
  {
    id: "1a2b3c4d-1111-2222-3333-aaaaaaaaaaaa",
    title: "Buy groceries",
    description: "Milk, Bread, Eggs",
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    priority: "High",
    isCompleted: true,
  },
  {
    id: "1a2b3c4d-1111-2222-3333-bbbbbbbbbbbb",
    title: "Read book",
    description: "Finish reading 'Clean Code'",
    dueDate: new Date(Date.now() + 0 * 24 * 60 * 60 * 1000),
    priority: "Medium",
    isCompleted: false,
  },
  {
    id: "1a2b3c4d-1111-2222-3333-cccccccccccc",
    title: "Workout",
    description: "30 minutes of cardio",
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    priority: "Low",
    isCompleted: true,
  },
  {
    id: "1a2b3c4d-1111-2222-3333-dddddddddddd",
    title: "Call mom",
    description: "Check in and catch up",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    priority: "Medium",
    isCompleted: false,
  },
  {
    id: "1a2b3c4d-1111-2222-3333-eeeeeeeeeeee",
    title: "Organize closet",
    description: "Sort clothes and donate unused items",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    priority: "Low",
    isCompleted: false,
  },
  {
    id: "1a2b3c4d-1111-2222-3333-ffffffffffff",
    title: "Meditation",
    description: "10 minutes of mindfulness meditation",
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    priority: "High",
    isCompleted: true,
  },
];

const projects = [
  {
    id: "proj-1111-aaaa-bbbb-cccc-000000000001",
    title: "Personal",
    description: "Personal tasks and reminders",
    ownedTasksIds: [
      "1a2b3c4d-1111-2222-3333-aaaaaaaaaaaa",
      "1a2b3c4d-1111-2222-3333-dddddddddddd",
      "1a2b3c4d-1111-2222-3333-eeeeeeeeeeee",
    ],
  },
  {
    id: "proj-1111-aaaa-bbbb-cccc-000000000002",
    title: "Learning",
    description: "Tasks related to learning and self-improvement",
    ownedTasksIds: ["1a2b3c4d-1111-2222-3333-bbbbbbbbbbbb"],
  },
  {
    id: "proj-1111-aaaa-bbbb-cccc-000000000003",
    title: "Health",
    description: "Health and wellness related tasks",
    ownedTasksIds: [
      "1a2b3c4d-1111-2222-3333-cccccccccccc",
      "1a2b3c4d-1111-2222-3333-ffffffffffff",
    ],
  },
];

const demoData = { Task: tasks, UserProject: projects };
export default demoData;
