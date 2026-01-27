import { NavLink } from "react-router-dom";
import { BookOpen, CheckSquare, Calendar, BarChart2 } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Diary</h2>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => `flex items-center p-2 rounded-lg ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
              <BookOpen className="mr-3" />
              Diary Entries
            </NavLink>
          </li>
          <li>
            <NavLink to="/tasks" className={({ isActive }) => `flex items-center p-2 rounded-lg ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
              <CheckSquare className="mr-3" />
              Tasks
            </NavLink>
          </li>
          <li>
            <NavLink to="/appointments" className={({ isActive }) => `flex items-center p-2 rounded-lg ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
              <Calendar className="mr-3" />
              Appointments
            </NavLink>
          </li>
          <li>
            <NavLink to="/reports" className={({ isActive }) => `flex items-center p-2 rounded-lg ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
              <BarChart2 className="mr-3" />
              Reports
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
