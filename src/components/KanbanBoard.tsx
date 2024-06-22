// src/components/KanbanBoard.tsx

import React from "react";
import { useSelector } from "react-redux";

import Column from "./Column";
import { ITask } from "../store/taskSlice";
import { RootState } from "../store/store";

interface IColumns {
  Pending: ITask[];
  Completed: ITask[];
  Overdue: ITask[];
  Removed: ITask[];
}

const KanbanBoard: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const columns = {
    Pending: tasks.filter((task: ITask) => task.status === "Pending"),
    Completed: tasks.filter((task: ITask) => task.status === "Completed"),
    Overdue: tasks.filter((task: ITask) => task.status === "Overdue"),
    Removed: tasks.filter((task: ITask) => task.status === "Removed"),
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {Object.keys(columns).map((key) => (
        <Column key={key} title={key} tasks={columns[key as keyof IColumns]} />
      ))}
    </div>
  );
};

export default KanbanBoard;
