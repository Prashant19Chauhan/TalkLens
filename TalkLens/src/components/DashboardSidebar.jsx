import { Link } from "react-router-dom";

const DashboardSidebar = () => {
    return (
      <aside className="w-64 bg-indigo-600 text-white py-6 px-4">
        <div className="text-2xl font-bold mb-6">VideoMeet</div>
        <nav className="space-y-4">
          <Link to={'/dashboard'} className="block text-white hover:bg-indigo-700 px-4 py-2 rounded-md transition">Dashboard</Link>
          <Link to={'/dashboard?tab=profile'} className="block text-white hover:bg-indigo-700 px-4 py-2 rounded-md transition">Profile</Link>
          <Link to={'/dashboard?tab=settings'} className="block text-white hover:bg-indigo-700 px-4 py-2 rounded-md transition">Settings</Link>
          <Link to={'/dashboard?tab=logout'} className="block text-white hover:bg-indigo-700 px-4 py-2 rounded-md transition">Logout</Link>
        </nav>
      </aside>
    );
  };
  
  export default DashboardSidebar;
  