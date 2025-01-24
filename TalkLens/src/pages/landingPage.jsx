
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-700 text-white flex flex-col justify-center items-center">
      {/* Hero Section */}
      <div className="text-center py-20 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
          Stay Connected with High-Quality Video Calls
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Experience seamless video conferencing with our intuitive platform.
        </p>
        <div className="flex space-x-4 justify-center">
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition">
            Get Started
          </button>
          <button className="border-2 border-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-indigo-600 transition">
            Learn More
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full bg-white text-gray-800 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-gray-100 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">High-Quality Video</h3>
              <p>Enjoy clear, lag-free video calls with enhanced audio quality.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Easy to Use</h3>
              <p>Our platform is simple and intuitive, no setup required.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Secure Communication</h3>
              <p>All calls are encrypted for your privacy and security.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 w-full py-6 text-white text-center">
        <p>&copy; 2025 Video Conferencing App | All rights reserved</p>
      </footer>
    </div>
  );
};

export default LandingPage;
