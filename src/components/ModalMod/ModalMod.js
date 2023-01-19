import React from 'react'
import Modal from 'react-bootstrap/Modal';
import './modalMod.css'
import FormAltaMenu from '../FormAltaMenu/FormAltaMenu';
import FormModMenu from '../FormModMenu/FormModMenu';
import InfoMenu from '../InforMenu/InfoMenu';

const ModalMod = ({show, handleClose, id, nombrePlato, modalAux}) => {

  let componente = null;

  if(modalAux === 'altaMenu'){
    componente = <FormAltaMenu/>
  }else if (modalAux === 'modificarMenu') {
    componente = <FormModMenu id={id}/>
  }else if (modalAux === 'mostrarMenu'){
    componente = <InfoMenu id={id}/>
  }
  return (
    <>
      <Modal className="modalAM"size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton closeVariant='white'>
          <Modal.Title>{nombrePlato}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {componente}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalMod