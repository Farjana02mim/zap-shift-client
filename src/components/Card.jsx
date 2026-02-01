import React from "react";
import cardsData from "../data/cardsData.json";
import icon from '../assets/service.png'
const Card = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cardsData.map((card) => (
        <div
          key={card.id}
          className={`rounded-[32px] p-10 text-center cursor-pointer 
          transition-all duration-300
          bg-gray-100 hover:bg-lime-400 hover:text-white`}
        >
          <img
            src={icon}
            alt={card.title}
            className="w-10 mx-auto mb-3"
          />

          <h3 className="text-lg font-semibold mb-2">
            {card.title}
          </h3>

          <p className="text-sm text-gray-600 hover:text-white">
            {card.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Card;
