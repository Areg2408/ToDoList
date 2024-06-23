// import { useSelector, useDispatch } from "react-redux";
// import { List, ListItem, ListItemText, Button } from "@mui/material";
// import { RootState } from "../store/store";
// import { restoreTask } from "../store/taskSlice";

// const Trash = () => {
//   const removedTasks = useSelector(
//     (state: RootState) => state.tasks.removedTasks
//   );
//   const dispatch = useDispatch();

//   return (
//     <div className="m-2 p-2 w-56 flex flex-col bg-white h-[400px] overflow-y-auto">
//       <h3 className="p-2 text-lg font-bold text-red-500">Trash</h3>
//       <List>
//         {removedTasks.map((task: any) => (
//           <ListItem
//             key={task.id}
//             className="flex flex-col mb-2  border-2 bg-red-100"
//           >
//             <ListItemText primary={task.title} />
//             <Button
//               color="error"
//               onClick={() => dispatch(restoreTask(task.id))}
//             >
//               Restore
//             </Button>
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );
// };

// export default Trash;

import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { RootState } from "../store/store";
import { restoreTask } from "../store/taskSlice";

const Trash = () => {
  const removedTasks = useSelector(
    (state: RootState) => state.tasks.removedTasks
  );
  const dispatch = useDispatch();

  const handleRestore = (taskId: string) => {
    dispatch(restoreTask(taskId));
  };

  return (
    <div>
      <h3 className="p-2 text-lg font-bold text-red-500">Trash</h3>
      <div className="m-2 p-2 w-56 flex flex-col h-[80vh] bg-white overflow-y-auto">
        {removedTasks.map((task: any) => (
          <Card
            key={task.id}
            className="mb-2 shrink-0 h-[120px] border-2 bg-red-200"
            onClick={() => handleRestore(task.id)}
            style={{ cursor: "pointer" }}
          >
            <CardContent className="flex flex-col items-center gap-2">
              <Typography color="error" variant="h5">
                {task.title}
              </Typography>
              <Button
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(restoreTask(task.id));
                }}
              >
                Restore
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Trash;
