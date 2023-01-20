import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import logo from "../../assets/icons/logo.png";

const ModalLogin = ({ show, handleClose }) => {
  return (
    
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='container-fluid text-center'>
            <img className='image-logo' src={logo} alt='modal-logo' />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Hacer un form</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>    
 );
};

export default ModalLogin;