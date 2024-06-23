import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  ITask,
  completeTask,
  removeTask,
  checkOverdueTasks,
  reopenTask,
} from "../store/taskSlice";
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import TaskForm from "./TaskForm";

interface IColumnProps {
  title: string;
  tasks: ITask[];
}

const Column = ({ title, tasks }: IColumnProps) => {
  const dispatch = useDispatch();
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<ITask | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(checkOverdueTasks());
    }, 60000); // check every minute
    return () => clearInterval(interval);
  }, [dispatch]);

  const getStatusBorderColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "border-blue-500";
      case "Overdue":
        return "border-yellow-500";
      case "Completed":
        return "border-green-500";
      default:
        return "border-gray-300"; // Default border color
    }
  };

  const handleEditClick = (task: ITask) => {
    setCurrentTask(task);
    setIsEditFormOpen(true);
  };

  const handleEditClose = () => {
    setIsEditFormOpen(false);
    setCurrentTask(null);
  };

  const handleCardClick = (task: ITask) => {
    setCurrentTask(task);
    setIsTaskDetailOpen(true);
  };

  const handleTaskDetailClose = () => {
    setIsTaskDetailOpen(false);
    setCurrentTask(null);
  };

  return (
    <div className="m-2 w-80">
      <h3 className="p-2 text-lg font-bold">{title}</h3>
      <div className="p-2 bg-white rounded shadow-lg h-[80vh] overflow-y-auto">
        {tasks.map((task) => (
          <Card
            key={task.id}
            className={`mb-2 border-2 ${getStatusBorderColor(task.status)}`}
            onClick={() => handleCardClick(task)}
            style={{ cursor: "pointer" }}
          >
            <CardContent className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div>
                  <Typography variant="h5">{task.title}</Typography>
                </div>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(task);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </div>
              {task.status === "Completed" ? (
                <Button
                  variant="contained"
                  color="success"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(reopenTask(task.id));
                  }}
                >
                  Reopen
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(completeTask(task.id));
                  }}
                  disabled={task.status === "Overdue"}
                >
                  Mark as Complete
                </Button>
              )}
              <Button
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(removeTask(task.id));
                }}
              >
                Remove
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={isEditFormOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          {currentTask && (
            <TaskForm
              initialValues={currentTask}
              editMode={true}
              onClose={handleEditClose}
            />
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={isTaskDetailOpen} onClose={handleTaskDetailClose}>
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent>
          {currentTask && (
            <div>
              <Typography variant="h5">
                <span className="font-bold text-blue-500">Title:</span>{" "}
                {currentTask.title}
              </Typography>
              <Typography>
                <span className="font-bold text-blue-500">Description:</span>{" "}
                {currentTask.description}
              </Typography>
              <Typography>
                <span className="font-bold text-blue-500">Deadline:</span>{" "}
                {currentTask.deadline}
              </Typography>
              <Typography>
                <span className="font-bold text-blue-500">Status:</span>{" "}
                {currentTask.status}
              </Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTaskDetailClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Column;
