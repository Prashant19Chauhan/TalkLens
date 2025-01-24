
import { FaVideo, FaMicrophone, FaDesktop, FaUsers, FaShieldAlt } from 'react-icons/fa';

const FeaturesPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white text-center py-16">
        <h1 className="text-4xl font-semibold mb-4">Features of Our Meeting Platform</h1>
        <p className="text-lg mb-8">Experience seamless video meetings with powerful features designed for collaboration and productivity.</p>
        <a href="/signup" className="bg-yellow-500 text-black px-8 py-3 rounded-lg text-xl hover:bg-yellow-600 transition duration-200">Get Started</a>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Feature 1: Video Conferencing */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <FaVideo className="text-blue-600 text-4xl mb-4" />
              <h2 className="text-2xl font-semibold mb-4">High-Quality Video</h2>
              <p className="text-lg text-gray-700">Enjoy crystal-clear video quality with automatic bandwidth adjustments to ensure smooth meetings in any condition.</p>
            </div>

            {/* Feature 2: Mute/Unmute */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <FaMicrophone className="text-blue-600 text-4xl mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Mute/Unmute with Ease</h2>
              <p className="text-lg text-gray-700">Easily control your microphone with a single click to ensure smooth conversations without distractions.</p>
            </div>

            {/* Feature 3: Screen Sharing */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <FaDesktop className="text-blue-600 text-4xl mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Screen Sharing</h2>
              <p className="text-lg text-gray-700">Share your screen effortlessly to present documents, slides, or demos to your team or clients in real-time.</p>
            </div>

            {/* Feature 4: Participant Management */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <FaUsers className="text-blue-600 text-4xl mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Manage Participants</h2>
              <p className="text-lg text-gray-700">Easily add or remove participants, manage permissions, and ensure smooth collaboration during meetings.</p>
            </div>

            {/* Feature 5: Security */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <FaShieldAlt className="text-blue-600 text-4xl mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Top-Notch Security</h2>
              <p className="text-lg text-gray-700">All meetings are encrypted to ensure your conversations remain private and secure at all times.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white text-center py-16">
        <h2 className="text-3xl font-semibold mb-4">Ready to start your meeting?</h2>
        <p className="text-lg mb-8">Join or create a meeting today with our easy-to-use platform.</p>
        <a href="/signup" className="bg-yellow-500 text-black px-8 py-3 rounded-lg text-xl hover:bg-yellow-600 transition duration-200">Get Started</a>
      </section>
    </div>
  );
};

export default FeaturesPage;
