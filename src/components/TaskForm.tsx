import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import { TextField } from "formik-mui";
import { addTask, editTask } from "../store/taskSlice";
import { v4 as uuidv4 } from "uuid";

interface ITaskFormProps {
  initialValues: {
    id?: string;
    title: string;
    description?: string;
    deadline?: string;
  };
  editMode?: boolean;
  onClose: () => void;
}

const TaskSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  deadline: Yup.date(),
});

const TaskForm = ({
  initialValues,
  editMode = false,
  onClose,
}: ITaskFormProps) => {
  const dispatch = useDispatch();

  const handleSubmit = (values: any) => {
    const currentDate = new Date();
    const deadlineDate = new Date(values.deadline);

    // Check if deadline is in the past
    const isOverdue = deadlineDate < currentDate;

    const taskData = {
      ...values,
      id: values.id || uuidv4(), // Assign a new id if not editing
      status: isOverdue ? "Overdue" : "Pending",
    };

    if (editMode) {
      dispatch(editTask(taskData));
    } else {
      dispatch(addTask(taskData));
    }
    onClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={TaskSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <Field
            component={TextField}
            name="title"
            type="text"
            label="Title"
            fullWidth
            margin="normal"
          />
          <Field
            component={TextField}
            name="description"
            type="text"
            label="Description"
            fullWidth
            margin="normal"
          />
          <Field
            component={TextField}
            name="deadline"
            type="date"
            label="Deadline"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button type="submit" color="primary" variant="contained">
            {editMode ? "Update Task" : "Add Task"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
