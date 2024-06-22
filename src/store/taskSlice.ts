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
}

const initialState: ITaskState = {
  tasks: [],
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
        state.tasks[index].status = "Removed";
      }
    },
    completeTask: (state, action: PayloadAction<string>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      if (index !== -1 && state.tasks[index].status !== "Overdue") {
        state.tasks[index].status = "Completed";
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
  completeTask,
  checkOverdueTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
