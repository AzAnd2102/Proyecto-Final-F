import React from 'react'
import '../Footer/footer.css'

const Footer = () => {
  return (
    <footer className='bg-dark text-white footer container-fluid'>
      <div className="container-fluid text-center p-3">
        <p className="fs-5">&copy; Todos los derechos reservados :: <a className="text-white text-decoration-none" href='#Hamburguesas'>Restaurante Rolling</a> :: Argentina 2023</p>
        <p>Rodriguez Camila - Azalot Andrea - Basauri Matias</p>
      </div>
    </footer>
  )
}

export default Footer;