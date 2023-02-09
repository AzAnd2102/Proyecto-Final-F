import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import ModalMod from '../ModalMod/ModalMod';

function FilaTablaPedidos({id,idUsuario,carrito,monto,fecha,estado}) {
  const baseURL = process.env.REACT_APP_API_URL;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [datosUsuario, setDatosUsuario] = useState([]);

   const obtenerDatos = async () => {
    const respuesta = await fetch(`${baseURL}/usuarios/obtenerUnUsuario/${idUsuario}`)
    const menus = await respuesta.json()
    setDatosUsuario(menus);
  }

  useEffect(()=>{
    obtenerDatos();
  },[])

  const modificarEstado = async () =>{
    let bandera = false;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-2',
        cancelButton: 'btn btn-danger m-2'
      },
      buttonsStyling: false
    })
    
    await swalWithBootstrapButtons.fire({
      title: '¿El pedido está listo para entregar?',
      text: "Revise que esté completo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, entregar',
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
          'El pedido no está listo aún',
          'error'
        )
      }
    })

    if (bandera) {
      const respuesta = await fetch(`${baseURL}/pedidos/modificarEstadoPedido/${id}`,{
        method: 'PUT',
        body: JSON.stringify({
          "estado": "Entregado"
        }),
        headers:{
          "Content-Type" : "application/json"
        }
      })
      const pedidoModificado = await respuesta.json();
      await swalWithBootstrapButtons.fire(
        'Entregado!',
        'El pedido fue entregado',
        'success'
      )
      window.location.reload();
    } 
    
  }
  
  return (
    <>
      <tr>
        <td className='align-middle'>{id}</td>
        <td className='align-middle'>{`${datosUsuario.nombre} ${datosUsuario.apellido}`}</td>
        <td className='align-middle'>{monto}</td>
        <td className='align-middle'>{fecha}</td>
        <td className='align-middle'>{estado}</td>
        <td className='text-center'>
          <button type="button" className="btn btn1 btn-outline-success m-1" onClick={modificarEstado} disabled = {estado === "Entregado"}><i className="bi  bi-send"></i></button>
          <button type="button" className="btn btn1 btn-outline-info"><i className="bi bi-eye" onClick={handleShow}></i></button>
        </td>
      </tr>
      <ModalMod show={show} handleClose={handleClose} id={carrito} nombre={`Pedido de ${datosUsuario.nombre} ${datosUsuario.apellido}`} modalAux={'mostrarCarrito'}/>
    </>
  )
}

export default FilaTablaPedidos