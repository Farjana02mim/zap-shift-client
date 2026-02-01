import React from "react";
import Card from "../../../components/Card";

export default function Services() {
  return (
    <section className="bg-secondary my-4 py-16 rounded-[32px]">
      <div className="max-w-7xl mx-auto px-12 text-center">
        
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Our Services
        </h1>

        <p className="text-gray-300 max-w-3xl mx-auto mb-12">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        {/* IMPORTANT PART */}
        <div className="">
          <Card />
        </div>

      </div>
    </section>
  );
}
