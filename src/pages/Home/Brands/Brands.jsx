import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import amazon from '../../../assets/brands/amazon.png';
import amazonvector from '../../../assets/brands/amazon_vector.png';
import casio from '../../../assets/brands/casio.png';
import moonstar from '../../../assets/brands/moonstar.png';
import randstad from '../../../assets/brands/randstad.png';
import star from '../../../assets/brands/star.png';
import start_people from '../../../assets/brands/start_people.png';
import { Autoplay } from 'swiper/modules';

const brandLogos = [amazon, amazonvector, casio, moonstar, randstad, star, start_people]

export default function Brands() {
  return (
    <div className='max-w-7xl mx-auto px-12'>
      <h1 className="text-2xl py-12 text-center md:text-3xl font-semibold mb-8 text-gray-800">We've helped thousands of sales teams</h1>
    <Swiper
        loop={true}
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
    >
      {
        brandLogos.map((logo, index) => <SwiperSlide key={index}><img src={logo} /></SwiperSlide> )
      }
    </Swiper>
    </div>
  )
}
