import React from 'react'
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({review}) => {
    const {userName, review: testimonial, user_photoURL} = review;
  return (
    <div className="card max-w-md bg-base-100 shadow-xl">
      <div className="card-body gap-4">
        
        {/* Quote Icon */}
        <FaQuoteLeft className="text-primary text-3xl" />

        {/* Review Text */}
        <p className="text-base-content/80">
          {testimonial}
        </p>

        {/* User Info */}
        <div className="flex items-center gap-4 mt-4">
          <div className="avatar">
            <div className="w-12 rounded-full items-center justify-center">
              <img src={user_photoURL} alt="" />
            </div>
          </div>

          <div>
            <h4 className="font-semibold">{userName}</h4>
            <p className="text-sm text-base-content/60">
              Senior Product Designer
            </p>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex gap-2 mt-6 justify-center">
          <span className="w-2 h-2 rounded-full bg-base-300"></span>
          <span className="w-2 h-2 rounded-full bg-primary"></span>
          <span className="w-2 h-2 rounded-full bg-base-300"></span>
        </div>
    </div>
</div>
  )
}

export default ReviewCard;
