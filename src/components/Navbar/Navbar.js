import React, { useState } from "react";
import "./navbar.css";
import logo from "../../assets/icons/logo.png";
import usuario from "../../assets/icons/usuario.png";
import buscar from "../../assets/icons/buscar.png";
import carro from "../../assets/icons/carro.png";
import ModalLogin from "../ModalLogin/ModalLogin";


const Navbar = () => {
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <img className='image-logo' src={logo} alt='logo'/>
          <span className="navbar-brand mx-2 fs-4">Restaurante Rolling</span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className='container-fluid d-flex justify-content-end'>

              <div className="modal-login" onClick={handleShow}>
                <img className='logo-usuario mx-2' src={usuario} alt='usuario'/>
              </div>
            
              
              <div className="buscador">
                <img className='logo-buscar nav-icons-size mx-2' src={buscar} alt='buscar'/>
              </div>  
                
              <div className="modal-carro">
                <img className='logo-carro mx-2' src={carro} alt='carro'/>
              </div>
            
            </div>
          </div>
        </div>
      </nav>
      <ModalLogin show={show} handleClose={handleClose} />
    </>
  );
}; 

export default Navbar;