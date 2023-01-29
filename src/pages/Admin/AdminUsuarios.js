import React, { useState } from 'react'
import ModalMod from '../../components/ModalMod/ModalMod'
import TablaUsuarios from '../../components/TablaUsuarios/TablaUsuarios'

function AdminUsuarios() {

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  return (
    <div transition-style="in:wipe:bottom-right">
      <h1 className='text-center my-5'>Administrar Usuarios</h1>
      <button type="button" className="btn btn-outline-dark mx-5" onClick={handleShow2}><i className="bi bi-person-add mx-1 fs-6"> Agregar </i></button>
      <TablaUsuarios/>
      <ModalMod show={show2} handleClose={handleClose2} nombre='Alta Usuario' modalAux='altaUsuario'/>
    </div>
  )
}

export default AdminUsuarios;