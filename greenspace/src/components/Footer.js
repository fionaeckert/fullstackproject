import React from 'react'
import logo from '../styling/chicago.jpeg'
import '../styling/footer.css'


function Footer() {
  return (
    <div className='footer'>
    <img src={logo} alt="" className='footerPic'/>
    </div>
  )
}

export default Footer