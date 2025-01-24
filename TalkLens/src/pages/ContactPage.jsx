
const ContactPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Hero Section */}
      <section className="bg-blue-600 text-white text-center py-16">
        <h1 className="text-4xl font-semibold mb-4">Get in Touch</h1>
        <p className="text-lg mb-8">We are here to assist you. Feel free to contact us for any inquiries or support.</p>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Contact Information */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-4">Contact Information</h2>
            <p className="text-lg text-gray-700 mb-6">You can reach us via the following methods:</p>
            <ul className="text-lg text-gray-700">
              <li className="mb-4"><strong>Email:</strong> support@yourdomain.com</li>
              <li className="mb-4"><strong>Phone:</strong> (123) 456-7890</li>
              <li className="mb-4"><strong>Address:</strong> 123 Your Street, City, Country</li>
            </ul>
            <div className="flex gap-4">
              <a href="mailto:support@yourdomain.com" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200">Email Us</a>
              <a href="tel:+1234567890" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200">Call Us</a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-4">Send Us a Message</h2>
            <form action="#" method="POST">
              <div className="mb-4">
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-lg font-medium text-gray-700">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                ></textarea>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200">Send Message</button>
            </form>
          </div>

        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-6 md:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-8">Our Location</h2>
          <div className="w-full h-80 rounded-lg overflow-hidden">
            {/* You can integrate a real map here, using Google Maps or Mapbox */}
            <iframe
              title="Location"
              className="w-full h-full"
              src="https://www.google.com/maps/embed/v1/place?q=Your+Location+Address&key=YOUR_GOOGLE_MAPS_API_KEY"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;
