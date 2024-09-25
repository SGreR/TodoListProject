import { Routes, Route } from 'react-router-dom';
import AllTasksPage from '../pages/AllTasksPage.jsx'

function CustomRouter() {
  return (
      <Routes>
          <Route path="/*" element={<AllTasksPage />} />
      </Routes>
  );
}

export default CustomRouter;