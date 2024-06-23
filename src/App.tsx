import { useState } from "react";
import TaskForm from "./components/TaskForm";
import KanbanBoard from "./components/KanbanBoard";
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpen = () => {
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
  };

  return (
    <Container
      style={{ border: "1px solid black" }}
      className="p-4 flex flex-col items-center justify-center"
    >
      <Typography variant="h4" component="h1" className="mb-4">
        Todo List
      </Typography>
      <Button
        color="primary"
        variant="contained"
        onClick={handleOpen}
        className="mb-4"
      >
        Add Task
      </Button>
      <Dialog open={isFormOpen} onClose={handleClose}>
        <DialogTitle>Add a New Task</DialogTitle>
        <DialogContent>
          <TaskForm
            initialValues={{ title: "", description: "", deadline: "" }}
            onClose={handleClose}
          />
        </DialogContent>
      </Dialog>
      <div className="flex gap-4">
        <KanbanBoard />
      </div>
    </Container>
  );
};

export default App;
