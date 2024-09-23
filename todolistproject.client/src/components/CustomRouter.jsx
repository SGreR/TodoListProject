import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx'
import AllTasksPage from '../pages/AllTasksPage.jsx'
import FinishedTasksPage from '../pages/FinishedTasksPage.jsx'
import UnfinishedTasksPage from '../pages/UnfinishedTasksPage.jsx'

function CustomRouter() {
  return (
      <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/all-tasks" element={<AllTasksPage />} />
          <Route path="/finished-tasks" element={<FinishedTasksPage />} />
          <Route path="/unfinished-tasks" element={<UnfinishedTasksPage />} />
      </Routes>
  );
}

export default CustomRouter;