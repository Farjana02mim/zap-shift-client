import React from 'react'
import logo from '../../assets/logo.png'
const Logo = () => {
  return (
    <div className='flex items-end'>
      <img src={logo}></img>
      <h3 className="text-3xl font-bold -ms-2.5">zapShift</h3>
    </div>
  )
}

export default Logo
