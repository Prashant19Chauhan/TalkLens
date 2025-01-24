import DashboardSidebar from '../components/DashboardSidebar';
import DashboardContentArea from '../components/DashboardContentArea';
import { useState } from 'react';
import Profile from '../components/profile';
import Settings from '../components/settings';
import Logout from '../components/logout';

const Dashboard = () => {
  const [tab, setTab] = useState('');
  
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="flex">
        <DashboardSidebar />

        {/* Main Content */}
        { tab==='' && <DashboardContentArea /> }
        { tab==='profile' && <Profile /> }
        { tab==='setting' && <Settings /> }
        { tab==='logout' && <Logout /> }
      </div>
    </div>
  );
};

export default Dashboard;
