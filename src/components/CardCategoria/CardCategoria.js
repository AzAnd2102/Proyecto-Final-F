import React, { useState } from 'react'
import './cardCategoria.css'
import burguer from '../../assets/icons/hamburguesa.png'
import pizza from '../../assets/icons/pizza.png'
import ensalada from '../../assets/icons/ensalada.png'
import soda from '../../assets/icons/soda.png'
import coctel from '../../assets/icons/coctel.png'
import ModalDetalleProducto from '../ModalDetalleProducto/ModalDetalleProducto'
import Swal from 'sweetalert2'

const CardCategoria = ({nombre, categoria, precio, detalle, ingredientes}) => {
  let token = localStorage.getItem('token');

    
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const alerta = () =>{
    if (token) {
      handleShow();
    } else {
      Swal.fire(
        'Por favor, inicie sesión para comenzar a pedir',
        "Así disfrute de las delicias de nuestro restaurante",
        'warning'
      )
    }
  }
  return (
  <>
    
      <div  className="card my-3 col-12 col-lg-6 cursor mb-5" onClick={alerta}>
        <div> 
          <div className="row g-0 m-0 p-0">
            <div className="col-md-3 d-flex align-items-center justify-content-center">
              {
                categoria === "Hamburguesa" ? <img className= "w-100 mb-3" src={burguer} alt="imagen"/> 
                : categoria === "Pizza" ? <img className= "w-100 mb-3" src={pizza} alt="imagen"/>
                : categoria === "Bebida con Alcohol" ? <img className= "w-100 mb-3" src={coctel} alt="imagen"/> 
                : categoria === "Bebida sin Alcohol" ? <img className= "w-100 mb-3" src={soda} alt="imagen"/> 
                : <img className= "w-100 mb-3" src={ensalada} alt="imagen"/>
              }
            </div>
            <div className="col-md-9">
              <div className="card-body ">
                <div className='d-flex justify-content-between'>
                  <h5 className="card-titles fs-2 fw-bold"><a className='text-decoration-none text-black pe-none' id={nombre}>{nombre}</a></h5>
                  <h3 className='fw-bold'>${precio}</h3>
                </div>
                <p className="card-text p-4 fs-5">{detalle}</p>
              </div>
            </div>
          </div>
        </div> 
      </div>
      <ModalDetalleProducto show={show} handleClose={handleClose} nombre={nombre} categoria={categoria} ingredientes={ingredientes} detalle={detalle} precio={precio}/>
      
  </>

  )
}

export default CardCategoria