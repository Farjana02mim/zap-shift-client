import React from "react";
import icon from '../../assets/bookingIcon.png'
export default function WorksCard() {
  return (
    <div className="px-6 md:px-12 py-10 mx-auto">
      {/* Section title */}
      <h1 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-800">
        How it Works
      </h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {/* Card 1 */}
        <div className="group bg-white rounded-2xl p-6 text-center
                        transition-all duration-300
                        hover:shadow-xl hover:-translate-y-1">
          <div className="flex justify-center mb-4">
            <img
              src={icon}
              alt="Booking Pick & Drop"
              className="w-10 h-10 opacity-70 group-hover:opacity-100"
            />
          </div>
          <h3 className="text-sm md:text-base font-semibold mb-2 text-gray-800 group-hover:text-lime-600">
            Booking Pick & Drop
          </h3>
          <p className="text-xs md:text-sm text-gray-500 group-hover:text-gray-800">
            From personal packages to business shipments — we deliver on time, every time.
          </p>
        </div>

        {/* Card 2 */}
        <div className="group bg-white rounded-2xl p-6 text-center
                        transition-all duration-300
                        hover:shadow-xl hover:-translate-y-1">
          <div className="flex justify-center mb-4">
            <img
              src={icon}
              alt="Cash On Delivery"
              className="w-10 h-10 opacity-70 group-hover:opacity-100"
            />
          </div>
          <h3 className="text-sm md:text-base font-semibold mb-2 text-gray-800 group-hover:text-lime-600">
            Cash On Delivery
          </h3>
          <p className="text-xs md:text-sm text-gray-500 group-hover:text-gray-800">
            Secure cash on delivery service for customers nationwide.
          </p>
        </div>

        {/* Card 3 */}
        <div className="group bg-white rounded-2xl p-6 text-center
                        transition-all duration-300
                        hover:shadow-xl hover:-translate-y-1">
          <div className="flex justify-center mb-4">
            <img
              src={icon}
              alt="Delivery Hub"
              className="w-10 h-10 opacity-70 group-hover:opacity-100"
            />
          </div>
          <h3 className="text-sm md:text-base font-semibold mb-2 text-gray-800 group-hover:text-lime-600">
            Delivery Hub
          </h3>
          <p className="text-xs md:text-sm text-gray-500 group-hover:text-gray-800">
            Centralized delivery hub for faster parcel processing.
          </p>
        </div>

        {/* Card 4 */}
        <div className="group bg-white rounded-2xl p-6 text-center
                        transition-all duration-300
                        hover:shadow-xl hover:-translate-y-1">
          <div className="flex justify-center mb-4">
            <img
              src={icon}
              alt="Booking SME & Corporate"
              className="w-10 h-10 opacity-70 group-hover:opacity-100"
            />
          </div>
          <h3 className="text-sm md:text-base font-semibold mb-2 text-gray-800 group-hover:text-lime-600">
            Booking SME & Corporate
          </h3>
          <p className="text-xs md:text-sm text-gray-500 group-hover:text-gray-800">
            Dedicated logistics support for SME & corporate clients.
          </p>
        </div>

      </div>
    </div>
  );
}
