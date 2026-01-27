import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx'
import './index.css'
import Diary from './pages/Diary.tsx';
import Tasks from './pages/Tasks.tsx';
import Appointments from './pages/Appointments.tsx';
import Reports from './pages/Reports.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Diary /> },
      { path: 'tasks', element: <Tasks /> },
      { path: 'appointments', element: <Appointments /> },
      { path: 'reports', element: <Reports /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
