import React, { useState } from 'react'
import ModalMod from '../components/ModalMod/ModalMod';
import TablaMenus from '../components/TablaMenus/TablaMenus'
import './admin.css'

function Admin() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='bg-admin'>
      <h1 className='text-center my-5'>Administrar Menús</h1>
      <button type="button" className="btn btn-outline-dark mx-5" onClick={handleShow}><i class="bi bi-plus-circle mx-1 fs-6"> Agregar </i></button>
      <TablaMenus/>
      <ModalMod show={show} handleClose={handleClose} nombrePlato='Alta Menu' modalAux='altaMenu'/>
    </div>
  )
}

export default Admin