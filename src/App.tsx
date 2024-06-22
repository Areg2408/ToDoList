// import React, { useState } from "react";
// import TaskList from "./components/TaskList";
// import TaskForm from "./components/TaskForm";
// import { Container, Typography, Button } from "@mui/material";

// const App: React.FC = () => {
//   const [isFormOpen, setIsFormOpen] = useState(false);

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Todo List
//       </Typography>
//       <Button
//         color="primary"
//         variant="contained"
//         onClick={() => setIsFormOpen(true)}
//       >
//         Add Task
//       </Button>
//       {isFormOpen && (
//         <TaskForm
//           initialValues={{ title: "", description: "", deadline: "" }}
//           onClose={() => setIsFormOpen(false)}
//         />
//       )}
//       <TaskList />
//     </Container>
//   );
// };

// export default App;

// src/App.tsx

import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import KanbanBoard from "./components/KanbanBoard";
import { Container, Typography, Button } from "@mui/material";

const App: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Todo List
      </Typography>
      <Button
        color="primary"
        variant="contained"
        onClick={() => setIsFormOpen(true)}
      >
        Add Task
      </Button>
      {isFormOpen && (
        <TaskForm
          initialValues={{ title: "", description: "", deadline: "" }}
          onClose={() => setIsFormOpen(false)}
        />
      )}
      <KanbanBoard />
    </Container>
  );
};

export default App;
