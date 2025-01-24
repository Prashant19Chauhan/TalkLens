const DashboardContentArea = () => {
    return (
      <main className="flex-1 bg-white p-8">
        {/* Page Header */}
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold text-gray-900">Welcome to Your Dashboard</h1>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
            Upgrade Plan
          </button>
        </header>
  
        {/* User Overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Profile</h2>
            <p className="text-gray-600">Update your profile and view your information.</p>
            <button className="mt-4 text-indigo-600 hover:text-indigo-800 transition">Edit Profile</button>
          </div>
          {/* Card 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Meetings</h2>
            <p className="text-gray-600">See your upcoming scheduled meetings.</p>
            <button className="mt-4 text-indigo-600 hover:text-indigo-800 transition">View Meetings</button>
          </div>
          {/* Card 3 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Settings</h2>
            <p className="text-gray-600">Manage your account settings and preferences.</p>
            <button className="mt-4 text-indigo-600 hover:text-indigo-800 transition">Manage Settings</button>
          </div>
        </section>
  
        {/* Activity Section */}
        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            <li className="flex justify-between">
              <span className="text-gray-700">Joined a meeting with John Doe</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-700">Scheduled a meeting with Jane Smith</span>
              <span className="text-sm text-gray-500">1 day ago</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-700">Updated profile picture</span>
              <span className="text-sm text-gray-500">3 days ago</span>
            </li>
          </ul>
        </section>
      </main>
    );
  };
  
  export default DashboardContentArea;
  