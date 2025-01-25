import { Link, useLocation } from "react-router-dom";

const DashboardSidebar = () => {
  const location = useLocation();

  // Extract the "tab" query parameter to highlight the active tab
  const searchParams = new URLSearchParams(location.search);
  const currentTab = searchParams.get("tab") || "";

  return (
    <aside className="w-64 bg-indigo-600 text-white py-6 px-4">
      <div className="text-2xl font-bold mb-6">VideoMeet</div>
      <nav className="space-y-4">
        <Link
          to="/dashboard"
          className={`block px-4 py-2 rounded-md transition ${
            currentTab === "" ? "bg-indigo-700" : "hover:bg-indigo-700"
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/dashboard?tab=profile"
          className={`block px-4 py-2 rounded-md transition ${
            currentTab === "profile" ? "bg-indigo-700" : "hover:bg-indigo-700"
          }`}
        >
          Profile
        </Link>
        <Link
          to="/dashboard?tab=settings"
          className={`block px-4 py-2 rounded-md transition ${
            currentTab === "settings" ? "bg-indigo-700" : "hover:bg-indigo-700"
          }`}
        >
          Settings
        </Link>
        <Link
          to="/dashboard?tab=logout"
          className={`block px-4 py-2 rounded-md transition ${
            currentTab === "logout" ? "bg-indigo-700" : "hover:bg-indigo-700"
          }`}
        >
          Logout
        </Link>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
