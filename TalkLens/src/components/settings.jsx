
import { useState } from 'react';

const Settings = () => {
  // State to hold user settings
  const [settings, setSettings] = useState({
    password: '',
    notifications: true,
    theme: 'light',
    language: 'en',
  });

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle password change
  const handlePasswordChange = () => {
    alert('Password Changed Successfully');
    // Logic for password change (this could be linked to an API)
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">Settings</h1>

        {/* Notifications Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Notifications</h2>
          <p className="text-gray-600 mb-4">Manage your notification preferences</p>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <span className="text-gray-800">Enable Notifications</span>
          </label>
        </div>

        {/* Theme Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Theme</h2>
          <p className="text-gray-600 mb-4">Choose your preferred theme</p>
          <select
            name="theme"
            value={settings.theme}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="light">Light Mode</option>
            <option value="dark">Dark Mode</option>
          </select>
        </div>

        {/* Language Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Language</h2>
          <p className="text-gray-600 mb-4">Select your preferred language</p>
          <select
            name="language"
            value={settings.language}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            {/* Add more languages as needed */}
          </select>
        </div>

        {/* Password Change Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Change Password</h2>
          <p className="text-gray-600 mb-4">Update your password</p>
          <input
            type="password"
            name="password"
            value={settings.password}
            onChange={handleChange}
            placeholder="New Password"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          <button
            onClick={handlePasswordChange}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-indigo-700 transition"
          >
            Change Password
          </button>
        </div>

        {/* Save Settings Button */}
        <div className="flex justify-end mt-8">
          <button className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700 transition">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
