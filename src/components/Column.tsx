// src/components/Column.tsx

import React from "react";
import { useDispatch } from "react-redux";
import { ITask, completeTask, removeTask } from "../store/taskSlice";
import { Card, CardContent, Typography, Button } from "@mui/material";

interface ColumnProps {
  title: string;
  tasks: ITask[];
}

const Column: React.FC<ColumnProps> = ({ title, tasks }) => {
  const dispatch = useDispatch();

  return (
    <div
      style={{
        margin: "8px",
        border: "1px solid lightgrey",
        borderRadius: "2px",
        width: "220px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3 style={{ padding: "8px" }}>{title}</h3>
      <div style={{ padding: "8px", flexGrow: 1, minHeight: "100px" }}>
        {tasks.map((task) => (
          <Card key={task.id} style={{ marginBottom: "8px" }}>
            <CardContent>
              <Typography variant="h5">{task.title}</Typography>
              <Typography>{task.description}</Typography>
              <Typography>{task.deadline}</Typography>
              <Button
                onClick={() => dispatch(completeTask(task.id))}
                disabled={
                  task.status === "Completed" || task.status === "Overdue"
                }
              >
                Mark as Complete
              </Button>
              <Button onClick={() => dispatch(removeTask(task.id))}>
                Remove
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Column;
