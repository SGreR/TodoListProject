import TableContainer from '@mui/material/Card';
import TaskTable from '../components/TaskTable.jsx'

function TaskListContainer() {
  return (
      <TableContainer>
          <TaskTable/>
      </TableContainer>
  );
}

export default TaskListContainer;