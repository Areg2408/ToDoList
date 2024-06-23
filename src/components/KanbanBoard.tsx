import { useSelector } from "react-redux";
import Column from "./Column";
import { RootState } from "../store/store";
import Trash from "./Trash";

const KanbanBoard = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const getTasksByStatus = (status: string) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="flex gap-4 p-4 w-full">
      <Column title="Pending" tasks={getTasksByStatus("Pending")} />
      <Column title="Completed" tasks={getTasksByStatus("Completed")} />
      <Column title="Overdue" tasks={getTasksByStatus("Overdue")} />
      <Trash />
    </div>
  );
};

export default KanbanBoard;
