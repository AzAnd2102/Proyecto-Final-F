import React, { useState } from 'react'
import ModalMod from '../ModalMod/ModalMod';

const Card =(props) => {

  const baseURL = 'http://localhost:8000';
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const eliminarMenu = async () =>{
    const respuesta = await fetch(`${baseURL}/menus/borrarMenu/${props.id}`, { method: 'DELETE' })
    const menuBorrado = await respuesta.json();
    console.log(menuBorrado);
  }

  return (
    <>
      <div className='d-flex justify-content-center my-5'>
        <div className="card" style={{width: "18rem"}}>
          <img src={props.imagen} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{props.nombre}</h5>
            <p className="card-text">{props.categoria}</p>
            <a href="/#">{props.precio}</a>
          </div>
          <div className='row m-0 p-0'>
            <button type="button" className="btn btn-warning col-6" onClick={handleShow}>Modificar</button>
            <button type="button" className="btn btn-danger col-6" onClick={eliminarMenu}>Borrar</button>
          </div>
        </div>
      </div>
      <ModalMod show={show} handleClose={handleClose} id={props.id} nombrePlato={props.nombre}/>
    </>
  )
}

export default Card