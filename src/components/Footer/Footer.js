import React from 'react'
import '../Footer/footer.css'
import facebook from '../../assets/icons/facebook.png'
import instagram from '../../assets/icons/instagram.png'
import twitter from '../../assets/icons/twitter.png'

const Footer = () => {
  return (
    <>
      <div class="container-fluid text-center text-dark p-3">
        <p class="fs-5">&copy; Todos los derechos reservados :: <a class="text-dark">Restaurante Rolling</a> :: Argentina 2023</p>
      </div>
      <div className='container d-flex justify-content-evenly w-50'>
        <div>
          <img className='social-icon' src={facebook} alt='icon1' />
        </div>
        <div>
          <img className='social-icon' src={instagram} alt='icon2' />
        </div>
        <div>
          <img className='social-icon' src={twitter} alt='icon3' />
        </div>
      </div>
    </>
  )
}

export default Footer;