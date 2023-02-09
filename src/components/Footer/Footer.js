import React from 'react'
import '../Footer/footer.css'
import facebook from '../../assets/icons/facebook.png'
import instagram from '../../assets/icons/instagram.png'
import twitter from '../../assets/icons/twitter.png'

const Footer = () => {
  return (
    <footer className='bg-dark text-white footer container-fluid mt-5 pb-2'>
      <div className="container-fluid text-center p-3">
        <p className="fs-5">&copy; Todos los derechos reservados :: <a className="text-white text-decoration-none" href='#Hamburguesas'>Restaurante Rolling</a> :: Argentina 2023</p>
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
    </footer>
  )
}

export default Footer;