import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITask {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
  status: "Pending" | "Completed" | "Overdue" | "Removed";
}

export interface ITaskState {
  tasks: ITask[];
  removedTasks: ITask[];
}

const initialState: ITaskState = {
  tasks: [],
  removedTasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action: PayloadAction<ITask>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        const [removedTask] = state.tasks.splice(index, 1);
        removedTask.status = "Removed";
        state.removedTasks.push(removedTask);
      }
    },
    restoreTask: (state, action: PayloadAction<string>) => {
      const index = state.removedTasks.findIndex(
        (task) => task.id === action.payload
      );
      if (index !== -1) {
        const [restoredTask] = state.removedTasks.splice(index, 1);
        restoredTask.status = "Pending"; // or any other status you prefer
        state.tasks.push(restoredTask);
      }
    },
    completeTask: (state, action: PayloadAction<string>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      if (index !== -1 && state.tasks[index].status !== "Overdue") {
        state.tasks[index].status = "Completed";
      }
    },
    reopenTask: (state, action: PayloadAction<string>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      if (index !== -1 && state.tasks[index].status === "Completed") {
        state.tasks[index].status = "Pending";
      }
    },

    checkOverdueTasks: (state) => {
      const now = new Date().toISOString();
      state.tasks.forEach((task) => {
        if (
          task.deadline &&
          task.deadline < now &&
          task.status !== "Completed"
        ) {
          task.status = "Overdue";
        }
      });
    },
  },
});

export const {
  addTask,
  editTask,
  removeTask,
  restoreTask,
  completeTask,
  reopenTask,
  checkOverdueTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
