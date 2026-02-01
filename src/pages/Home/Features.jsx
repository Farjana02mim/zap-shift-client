import React from "react";
import icon1 from '../../assets/live-tracking.png';
import icon2 from '../../assets/safe-delivery.png';

export default function Features() {
  return (
    <div className="max-w-7xl mx-auto px-12 py-12 space-y-6">

      {/* Feature 1 */}
      <div className="flex items-center gap-6 bg-white rounded-[32px] p-6">
        <img
          src={icon1}
          alt="Live Parcel Tracking"
          className="w-24 h-24"
        />
        <div className="border-l-2 border-dashed border-gray-300 pl-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Live Parcel Tracking
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Stay updated in real-time with our live parcel tracking feature.
            From pick-up to delivery, monitor your shipment’s journey and get
            instant status updates for complete peace of mind.
          </p>
        </div>
      </div>

      {/* Feature 2 */}
      <div className="flex items-center gap-6 bg-white rounded-[32px] p-6">
        <img
          src={icon2}
          alt="100% Safe Delivery"
          className="w-24 h-24"
        />
        <div className="border-l-2 border-dashed border-gray-300 pl-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            100% Safe Delivery
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            We ensure your parcels are handled with the utmost care and delivered
            securely to their destination. Our reliable process guarantees safe
            and damage-free delivery every time.
          </p>
        </div>
      </div>

      {/* Feature 3 */}
      <div className="flex items-center gap-6 bg-white rounded-[32px] p-6">
        <img
          src={icon2}
          alt="24/7 Call Center Support"
          className="w-24 h-24"
        />
        <div className="border-l-2 border-dashed border-gray-300 pl-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            24/7 Call Center Support
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Our dedicated support team is available around the clock to assist
            you with any inquiries, updates, or delivery concerns—anytime you
            need us.
          </p>
        </div>
      </div>

    </div>
  );
}
