import DashboardSidebar from '../components/DashboardSidebar';
import DashboardContentArea from '../components/DashboardContentArea';
import Profile from '../components/profile';
import Settings from '../components/settings';
import Logout from '../components/logout';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();

  // Extract the "tab" query parameter from the URL
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get('tab') || '';

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {tab === '' && <DashboardContentArea />}
        {tab === 'profile' && <Profile />}
        {tab === 'settings' && <Settings />}
        {tab === 'logout' && <Logout />}
      </div>
    </div>
  );
};

export default Dashboard;
