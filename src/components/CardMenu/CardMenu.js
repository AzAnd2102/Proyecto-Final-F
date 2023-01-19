import React, { useState } from 'react'
import './cardMennu.css';
import ModalMod from '../ModalMod/ModalMod';
import 'animate.css';

const Card =(props) => {

  const baseURL = 'http://localhost:8000';
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  
  const eliminarMenu = async () =>{
    const respuesta = await fetch(`${baseURL}/menus/borrarMenu/${props.id}`, { method: 'DELETE' })
    const menuBorrado = await respuesta.json();
    console.log(menuBorrado);
  }

  return (
    <>
      <div className='d-flex justify-content-center col-lg-4 col-md-6 col-sm-12 mt-5'>
        <div className="card border-none animate__animated animate__fadeInLeft" style={{width: "18rem"}}>
          <img src={props.imagen} className="card-img-top" alt="..." />
          <div className="card-body mt-3 p-0">
            <h5 className="card-title text-center fw-bold">{props.nombre}</h5>
            <div className='row m-0 p-0'>
              <p className="card-text col-7">{props.categoria}</p>
              <p className="card-text col-5 text-end">${props.precio}</p>
            </div>
          </div>
          <div className='d-grid gap-3 d-flex justify-content-center mb-3'>
            <button type="button" className="btn btn-outline-warning" onClick={handleShow}><i class="bi bi-pencil"></i></button>
            <button type="button" className="btn btn-outline-danger" onClick={eliminarMenu}><i class="bi bi-trash3"></i></button>
            <button type="button" className="btn btn-outline-info" onClick={handleShow2}><i class="bi bi-eye"></i></button>
          </div>
        </div>
      </div>
      <ModalMod show={show} handleClose={handleClose} id={props.id} nombrePlato={props.nombre} modalAux={'modificarMenu'}/>
      <ModalMod show={show2} handleClose={handleClose2} id={props.id} nombrePlato={props.nombre} modalAux={'mostrarMenu'}/>
    </>
  )
}

export default Card