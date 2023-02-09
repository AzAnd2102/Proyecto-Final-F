import React, { useState } from 'react'
import './cardMennu.css';
import ModalMod from '../ModalMod/ModalMod';
import 'animate.css';
import Swal from 'sweetalert2'

const Card =(props) => {

  const baseURL = process.env.REACT_APP_API_URL;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  
  const eliminarMenu = async () =>{
    let bandera = false;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-2',
        cancelButton: 'btn btn-danger m-2'
      },
      buttonsStyling: false
    })
    
    await swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: "Este proceso es inrevertible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        bandera = true;
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El menu se encuentra a salvo',
          'error'
        )
      }
    })

    if (bandera) {
      const respuesta = await fetch(`${baseURL}/menus/borrarMenu/${props.id}`, { method: 'DELETE' })
      const menuBorrado = await respuesta.json();
      await swalWithBootstrapButtons.fire(
        'Borrado!',
        'El menu fue eliminado',
        'success'
      )
      window.location.reload();

    } 
    
  }

  return (
    <>
      <div className='d-flex justify-content-center mb-5 col-lg-4 col-md-6 col-sm-12 mt-5'>
        <div className="card animate__animated animate__fadeInLeft" style={{width: "18rem"}}>
          <div className='d-flex position-relative m-0 p-0'>
            <img src={props.imagen} className="card-img-top" alt="..." />
            <div className='position-absolute p-2 borderDiv d-flex justify-content-center top-0 start-100 translate-middle'>
              {props.estado === "Disponible" ? <i className="bi bi-check-circle text-white"></i> : <i className="bi bi-x-circle text-white"></i>}
            </div>
          </div>
          <div className="card-body mt-4 p-0">
            <div className='row m-0 p-0'>
              <h5 className="card-title fw-bold col-8">{props.nombre}</h5>
              <p className="card-text col-4 text-end">${props.precio}</p>
            </div>
          </div>
          <div className=' m-3 btn-group'>
            <button type="button" className="btn btn1 btn-outline-warning" onClick={handleShow}><i className="bi bi-pencil"></i></button>
            <button type="button" className="btn btn1 btn-outline-danger" onClick={eliminarMenu}><i className="bi bi-trash3"></i></button>
            <button type="button" className="btn btn1 btn-outline-info" onClick={handleShow2}><i className="bi bi-eye"></i></button>
          </div>
        </div>
      </div>
      <ModalMod show={show} handleClose={handleClose} id={props.id} nombre={props.nombre} modalAux={'modificarMenu'}/>
      <ModalMod show={show2} handleClose={handleClose2} id={props.id} nombre={props.nombre} modalAux={'mostrarMenu'}/>
    </>
  )
}

export default Card