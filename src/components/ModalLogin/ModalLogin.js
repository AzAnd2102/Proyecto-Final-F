import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import logo from "../../assets/icons/logo.png";

const ModalLogin = ({ show, handleClose }) => {
  return (
    
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='container-fluid text-center'>
            <img className='image-logo' src={logo} alt='modal-logo'/>
            <div className='bienvenida-text my-2'>
              <span>¡Te damos la bienvenida!</span>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body d-flex align-content-center justify-content-center'>
          <div className='modal-form'>
            <div className='col-md-12 mb-3'>
              <form className='row g-1'>
                <label for='validationDefault01' class='form-label'>Email</label>
                <input type='email' class='form-control rounded-pill'/>
              </form>
            </div>

            <div className='col-md-12 mb-3'>
              <form className='row g-1'>
                <label for='validationDefault01' class='form-label'>Contraseña</label>
                <input type='password' class='form-control rounded-pill'/>
              </form>
            </div>
              <div className='text-registro text-center mb-1'>
                <a className='text-decoration-none text-dark' href='...'>¿Olvidaste tu contraseña? </a>
              </div>
              <div className='text-registro text-center'>
                <a className='text-decoration-none text-dark' href='...'>¿No tienes cuenta? Regístrate</a>
              </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='dark rounded-pill px-4' onClick={handleClose}>
            INGRESAR
          </Button>
        </Modal.Footer>
      </Modal>
 );
};

export default ModalLogin;