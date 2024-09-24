import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx'
import AllTasksPage from '../pages/AllTasksPage.jsx'

function CustomRouter() {
  return (
      <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/all-tasks" element={<AllTasksPage />} />
      </Routes>
  );
}

export default CustomRouter;