import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt='assetlogo' />
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum quibusdam in suscipit.dummy texxt ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="facebookicon" />
                <img src={assets.twitter_icon} alt="twittericon" />
                <img src={assets.linkedin_icon} alt="linkedinicon" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+234-80-2432-2333</li>
                <li>contact@freeman.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 Food.com - All Right Reserved</p>
    </div>
  )
}

export default Footer
    