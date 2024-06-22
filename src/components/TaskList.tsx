import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { List, ListItem, ListItemText, Button } from "@mui/material";
import { completeTask, removeTask } from "../store/taskSlice";
import { RootState } from "../store/store";

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  return (
    <List>
      {tasks.map((task: any) => (
        <ListItem key={task.id}>
          <ListItemText
            primary={task.title}
            secondary={`${task.description} - ${task.deadline}`}
          />
          <Button
            onClick={() => dispatch(completeTask(task.id))}
            disabled={task.status === "Completed" || task.status === "Overdue"}
          >
            Mark as Complete
          </Button>
          <Button onClick={() => dispatch(removeTask(task.id))}>Remove</Button>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
