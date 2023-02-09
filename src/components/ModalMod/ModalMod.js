import React from 'react'
import Modal from 'react-bootstrap/Modal';
import './modalMod.css'
import FormAltaMenu from '../FormAltaMenu/FormAltaMenu';
import FormModMenu from '../FormModMenu/FormModMenu';
import InfoMenu from '../InforMenu/InfoMenu';
import FormModUsuario from '../FormModUsuario/FormModUsuario';
import FormAltaUsuario from '../FormAltaUsuario/FormAltaUsuario';
import InforCarrito from '../InfoCarrito/InforCarrito';

const ModalMod = ({show, handleClose, id, nombre, modalAux}) => {

  let componente = null;

  if(modalAux === 'altaMenu'){
    componente = <FormAltaMenu/>
  }else if (modalAux === 'modificarMenu') {
    componente = <FormModMenu id={id}/>
  }else if (modalAux === 'mostrarMenu'){
    componente = <InfoMenu id={id}/>
  }else if (modalAux === 'modificarUsuario') {
    componente = <FormModUsuario id={id}/>
  }else if (modalAux === 'altaUsuario') {
    componente = <FormAltaUsuario/>
  }else if (modalAux === 'mostrarCarrito') {
    componente = <InforCarrito carrito={id}/>
  }
  return (
    <>
      <Modal className="modalAM" size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton closeVariant='white'>
          <Modal.Title>{nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {componente}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalMod