import React, { useState } from 'react'
import ModalMod from '../../components/ModalMod/ModalMod';
import TablaMenus from '../../components/TablaMenus/TablaMenus';

function AdminMenus() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <h1 className='text-center my-5'>Administrar Menús</h1>
      <button type="button" className="btn btn-outline-dark mx-5" onClick={handleShow}><i className="bi bi-plus-circle mx-1 fs-6"> Agregar </i></button>
      <TablaMenus/>
      <ModalMod show={show} handleClose={handleClose} nombre='Alta Menu' modalAux='altaMenu'/>
    </>
  )
}

export default AdminMenus;