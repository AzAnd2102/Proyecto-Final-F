import React, { useState } from "react";
import "./navbar.css";
import logo from "../../assets/icons/logo.png";
import usuario from "../../assets/icons/usuario.png";
import casa from "../../assets/icons/casa.png"
import carro from "../../assets/icons/carro.png";
import cerrar_Sesion from "../../assets/icons/cerrar-sesion.png";
import admin from "../../assets/icons/admin.png"
import ModalLogin from "../ModalLogin/ModalLogin";
import ModalCart from "../ModalCart/ModalCart";
import {Link} from "react-router-dom";


const Navbar = () => {
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [showCartModal, setShowCartModal] = useState(false);

  const handleShowModalCart = () => {
    if (showCartModal) {
      setShowCartModal(false);
    } else {
      setShowCartModal(true);
    }
  };

  let token = localStorage.getItem('token');
  let rol = localStorage.getItem('rol');

  const cerrarSesion = () =>{
    window.location.reload();
    localStorage.clear();
  }



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
                {token ? null : <img className='logo-usuario' src={usuario} alt='usuario'/>}
              </div>
              <div className="cerrarSesion" onClick={cerrarSesion}>
                {token ? <Link className='text-decoration-none text-dark logo-usuario ' to='/'><img className='logo-usuario mx-2' src={cerrar_Sesion} alt='usuario'/></Link> : null}
              </div>
              <div className="casa">
                {rol === "admin" ? <Link className='text-decoration-none text-dark logo-usuario ' to='/'><img className='logo-usuario mx-2' src={casa} alt='usuario'/></Link> : null}
              </div>  
              <div className="">
                {rol === "admin" ? <Link className='text-decoration-none text-dark logo-usuario ' to='/admin'><img className='logo-usuario mx-2' src={admin} alt='usuario'/></Link> : null}
              </div> 
              <div className="modal-carro" onClick={handleShowModalCart}>
                {token && rol !== "admin" ? <img className='logo-carro mx-2' src={carro} alt='carro'/> : token && rol === "admin" ? <img className='logo-usuario mx-2' src={carro} alt='carro'/> : null}
                {showCartModal ? <ModalCart /> : null}
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