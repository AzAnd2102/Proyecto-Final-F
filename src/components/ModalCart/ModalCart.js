import React, { useEffect, useState } from 'react';
import "./modalCart.css";
import burger from "../../assets/icons/hamburguesa.png";
import pizza from "../../assets/icons/pizza.png"
import borrar from "../../assets/icons/borrar.png";
import Swal from 'sweetalert2';
import { Button } from 'react-bootstrap';

const ModalCart = () => {
  const [datos, setDatos] = useState([]);
  const baseURL = 'http://localhost:8000';
  let total = 0;
  let i=0;
  let comida = [];
  const obtenerDatos = async () => {
    const baseURL = 'http://localhost:8000';
    const respuesta = await fetch(`${baseURL}/carrito/obtenerCarrito`)
    const carrito = await respuesta.json()
    setDatos(carrito)
  }

  useEffect(()=>{obtenerDatos()},[])

  let pedidoID = localStorage.getItem('pedidoId');

  datos.map(menu => {
    if (menu.pedidoID === pedidoID && menu.estado === "Seleccionado") {
      total = total + menu.precio;
      comida[i]=menu;
      i++;
    }
  })

  const elimarElemento = async (id) =>{
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
        const respuesta = await fetch(`${baseURL}/carrito/borrarCarrito/${id}`,{   method: 'DELETE'})
      const menuBorrado = await respuesta.json();
      console.log(menuBorrado)
      await swalWithBootstrapButtons.fire(
        'Borrado!',
        'El menú fue eliminado',
        'success'
      )

      window.location.reload();
    } 
  }

  const realizarPedido = async () =>{
    let today = new Date();
    let userId = localStorage.getItem('userId');
    let now = today.toLocaleString();

    const pedido = {
      "total" : total,
      "comida" : comida,
      "pedidoId" : pedidoID,
      "fecha": now,
      "usuarioID" : userId
    }
    const respuesta = await fetch(`${baseURL}/pedidos/crearPedido`,{
      method: 'POST',
      body: JSON.stringify(pedido),
      headers:{
        "Content-Type" : "application/json"
      }
    })
    await Swal.fire(
      'Pedido enviado!',
      '¡Tu pedido comenzó a preparse!',
      'success'
    )

    comida.forEach(plato => {
      fetch(`${baseURL}/carrito/modificarCarrito/${plato._id}`,{
        method: 'PUT',
        body: JSON.stringify({
          "estado": "pedido"
        }),
        headers:{
          "Content-Type" : "application/json"
        }
      })
    })

    window.location.reload();
  }

  return (
    <div className="cart-modal z-3">
      <div className="cart-modal-content">
        {datos.map((item) => (
          item.pedidoID === pedidoID && item.estado === "Seleccionado"?
            <div className="food-content">
              <div className="food-icon">
                {item.categoria === "Hamburguesa" ?<img src={burger} alt="food" className='imagen-Food m-2 w-25'/> : item.categoria === "Pizza" ? <img src={pizza} alt="food" className='imagen-Food m-2 w-25'/>: null} 
                <div>
                  <span className='fw-bold'>{item.nombrePlato}</span>
                  <p>${item.precio}</p>
                </div>
              </div>
              <button className="delete-btn" onClick={()=>elimarElemento(item._id)}>
                <img
                  className="image-delete-btn"
                  src={borrar}
                  alt="delete"
                />
              </button>
            </div>: null
        ))}
        <div className='position-relative mt-3'>
          <span className='fw-bold'> Total = ${total}</span>
          { total > 0 ? 
          <Button type="button" size="sm" className='position-absolute bottom-0 end-0' variant="outline-danger" onClick={realizarPedido}>Pedir</Button> : null}
        </div>
        
      </div>
    </div>
  );
};

export default ModalCart;