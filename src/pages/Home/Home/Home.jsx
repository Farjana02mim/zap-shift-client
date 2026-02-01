import React from 'react'
import Banner from '../Banner/Banner'
import Services from '../Services/Services'
import WorksCard from '../worksCard'
import Brands from '../Brands/Brands'
import Features from '../Features'
import Reviews from '../Reviews/Reviews'

const reviewsPromise = fetch('/reviews.json').then(res=>res.json());

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <WorksCard></WorksCard>
      <Services></Services>
      <Brands></Brands>
      <Features></Features>
      <Reviews reviewsPromise = {reviewsPromise} ></Reviews>
    </div>
  )
}

export default Home
