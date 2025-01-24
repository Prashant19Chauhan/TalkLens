
import { useState } from 'react';

const Profile = () => {
  // State to hold profile information
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    profilePicture: 'https://via.placeholder.com/150', // Example placeholder
  });

  // State to toggle edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">Profile</h1>
        <div className="flex items-center mb-8">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mr-6"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* Profile Form */}
        <div>
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-800 font-semibold mb-2">
              Name
            </label>
            {isEditing ? (
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            ) : (
              <p className="text-gray-600">{user.name}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            ) : (
              <p className="text-gray-600">{user.email}</p>
            )}
          </div>

          <div className="flex justify-between items-center">
            {/* Toggle Edit/Save button */}
            <button
              onClick={toggleEdit}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-indigo-700 transition"
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
            {isEditing && (
              <button
                onClick={() => setUser({ ...user, profilePicture: 'https://via.placeholder.com/150' })}
                className="text-gray-600 font-semibold hover:text-gray-800 transition"
              >
                Reset Picture
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
