import React, { useState } from 'react'
import Swal from 'sweetalert2';
import ModalMod from '../ModalMod/ModalMod';

function FilaTablaUsuarios({id,email,nombre,apellido,estado,rol}) {
  const baseURL = 'http://localhost:8000';

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const eliminarUsuario = async () =>{
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
          'El usuario se encuentra a salvo',
          'error'
        )
      }
    })
    let token = localStorage.getItem('token');

    if (bandera) {
        const respuesta = await fetch(`${baseURL}/usuarios/borrarUsuario/${id}`,{   method: 'DELETE',
        body: JSON.stringify(
          {"token": token}
        ),
        headers:{
          "Content-Type" : "application/json"
        }
      })
      const usuarioBorrado = await respuesta.json();
      console.log(usuarioBorrado)
      await swalWithBootstrapButtons.fire(
        'Borrado!',
        'El usuario fue eliminado',
        'success'
      )

      window.location.reload();
    } 
    
  }

  return (
    <>
      <tr>
        <td className='align-middle'>{id}</td>
        <td className='align-middle'>{nombre}</td>
        <td className='align-middle'>{apellido}</td>
        <td className='align-middle'>{estado === "activo" ? <i className="bi bi-person-check fs-4"></i> : <i className="bi bi-person-dash fs-4"></i>}</td>
        <td className='align-middle'>{email}</td>
        <td className='align-middle'>{rol === "admin" ? <i className="bi bi-person-vcard fs-4"></i> : <i className="bi bi-person fs-4"></i>}</td>
        <td className='text-center'>
          <button type="button" className="btn btn1 btn-outline-warning m-1" onClick={handleShow}><i className="bi bi-pencil"></i></button>
          <button type="button" className="btn btn1 btn-outline-danger m-1" onClick={eliminarUsuario}><i className="bi bi-trash3"></i></button>
        </td>
      </tr>
      <ModalMod show={show} handleClose={handleClose} id={id} nombre={`${nombre} ${apellido}`} modalAux={'modificarUsuario'}/>
    </>
  )
}

export default FilaTablaUsuarios