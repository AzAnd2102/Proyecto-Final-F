import React from 'react'
import burguer from '../../assets/icons/hamburguesa.png'
import pizza from '../../assets/icons/pizza.png'
import ensalada from '../../assets/icons/ensalada.png'
import soda from '../../assets/icons/soda.png'
import coctel from '../../assets/icons/coctel.png'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



const ModalDetalleProducto = ({ show, handleClose, nombre, categoria, detalle, ingredientes, precio}) => {
  const {register, formState: { errors }, handleSubmit} = useForm();
  const baseURL = process.env.REACT_APP_API_URL;

  const procesarCarrito = async (data) =>{
    let arrayIngredientes = [];
    let i = 0;
    let pedidoId = localStorage.getItem('pedidoId');


    ingredientes.map(ingrediente => {
      let check = document.getElementById(`check${ingrediente}`);
      if (check.checked) {
        arrayIngredientes[i] = check.name;
        i++;
      }
    })

    if (arrayIngredientes.length !== 0) {
      let datos = {
        "nombrePlato" : nombre,
        "categoria" : categoria,
        "ingredientes" : arrayIngredientes,
        "precio": precio,
        "pedidoID": pedidoId,
        "estado": "Seleccionado"
      }
  
      const respuesta = await fetch(`${baseURL}/carrito/crearElementoCarrito`,{
        method: 'POST',
        body: JSON.stringify(datos),
        headers:{
          "Content-Type" : "application/json"
        }
      })
      window.location.reload();
    }else{
      await Swal.fire(
        'No seleccionaste ningun ingrediente!!',
        'Por favor selecciona algún ingrediente.',
        'error'
      )
    }
  }
  return (
    
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(procesarCarrito)}>
          <div className='row m-0 p-0'>
            <div className='col-12 col-md-6 col-lg-3'>
              {
                categoria === "Hamburguesa" ? <img className= "w-100 mb-3" src={burguer} alt="imagen"/> 
                : categoria === "Pizza" ? <img className= "w-100 mb-3" src={pizza} alt="imagen"/>
                : categoria === "Bebida con Alcohol" ? <img className= "w-100 mb-3" src={coctel} alt="imagen"/> 
                : categoria === "Bebida sin Alcohol" ? <img className= "w-100 mb-3" src={soda} alt="imagen"/> 
                : <img className= "w-100 mb-3" src={ensalada} alt="imagen"/>
              }
            </div>
            <div className='col-12 col-md-6 col-lg-5 d-flex align-items-center'>
              <p>{detalle}</p>
            </div>
            <div className='col-12 col-md-12 col-lg-4 d-flex align-items-center'>
              <div>
                {ingredientes.map(ingrediente =>
                  <Form.Check 
                    type="checkbox"
                    name={ingrediente}
                    id={`check${ingrediente}`}
                    label={ingrediente}
                  />
                )}
              </div>
            </div>
          </div>
          <Modal.Footer>
            <Button type="submit" variant="outline-dark">Agregar y seguir eligiendo</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalDetalleProducto