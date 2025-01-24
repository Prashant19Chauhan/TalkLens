
const PricingPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Hero Section */}
      <section className="bg-blue-600 text-white text-center py-16">
        <h1 className="text-4xl font-semibold mb-4">Our Pricing Plans</h1>
        <p className="text-lg mb-8">Choose the best plan for your business or personal meetings.</p>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">

            {/* Basic Plan */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-3xl font-semibold mb-4">Basic Plan</h2>
              <p className="text-xl text-gray-700 mb-4">Perfect for individuals or small teams.</p>
              <div className="text-4xl font-bold mb-4">$9.99 <span className="text-lg">/month</span></div>
              <ul className="text-left text-lg text-gray-700 mb-6">
                <li>1 Host</li>
                <li>720p Video Quality</li>
                <li>Up to 10 Participants</li>
                <li>Screen Sharing</li>
                <li>Email Support</li>
              </ul>
              <a href="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-xl hover:bg-blue-700 transition duration-200">Start Free Trial</a>
            </div>

            {/* Pro Plan */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center border-2 border-blue-600">
              <h2 className="text-3xl font-semibold mb-4">Pro Plan</h2>
              <p className="text-xl text-gray-700 mb-4">Ideal for growing teams or businesses.</p>
              <div className="text-4xl font-bold mb-4">$29.99 <span className="text-lg">/month</span></div>
              <ul className="text-left text-lg text-gray-700 mb-6">
                <li>5 Hosts</li>
                <li>1080p Video Quality</li>
                <li>Up to 50 Participants</li>
                <li>Advanced Screen Sharing</li>
                <li>Priority Support</li>
              </ul>
              <a href="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-xl hover:bg-blue-700 transition duration-200">Start Free Trial</a>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-3xl font-semibold mb-4">Enterprise Plan</h2>
              <p className="text-xl text-gray-700 mb-4">For large organizations with advanced needs.</p>
              <div className="text-4xl font-bold mb-4">Custom Pricing</div>
              <ul className="text-left text-lg text-gray-700 mb-6">
                <li>Unlimited Hosts</li>
                <li>4K Video Quality</li>
                <li>Up to 500 Participants</li>
                <li>Custom Branding</li>
                <li>Dedicated Support</li>
              </ul>
              <a href="/contact" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-xl hover:bg-blue-700 transition duration-200">Contact Us</a>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 md:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">

            {/* FAQ 1 */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">What’s included in the free trial?</h3>
              <p className="text-lg text-gray-700">You’ll have access to all Pro Plan features for 14 days. No credit card required.</p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Can I upgrade or downgrade my plan?</h3>
              <p className="text-lg text-gray-700">Yes, you can upgrade or downgrade your plan anytime from your account settings.</p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">How secure are the meetings?</h3>
              <p className="text-lg text-gray-700">All meetings are encrypted with end-to-end encryption to ensure your privacy and security.</p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">What payment methods do you accept?</h3>
              <p className="text-lg text-gray-700">We accept credit cards, PayPal, and bank transfers for all subscriptions.</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default PricingPage;
