import React, { Fragment, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
let ingredientes = '';

const FormModMenu = (props) => {
  
  const {register, formState: { errors }, handleSubmit} = useForm();
  const baseURL = process.env.REACT_APP_API_URL;
  const [datosMenu, setDatosMenu] = useState([]);

   const obtenerDatos = async () => {
    const respuesta = await fetch(`${baseURL}/menus/obtenerUnMenu/${props.id}`)
    const menus = await respuesta.json()
    setDatosMenu(menus);
    ingredientes = (menus.ingredientes).toString()
  }

  useEffect(()=>{
    obtenerDatos();
  },[])
  

  const modificarDatos = async (data,e) => {
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
      text: "Quiere modificar este menú",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, modificar',
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
          'El menu no se modificó',
          'error'
        )
      }
    })


    if (bandera) {
      const respuesta = await fetch(`${baseURL}/menus/modificarMenu/${props.id}`,{
        method: 'PUT',
        body: JSON.stringify(data),
        headers:{
          "Content-Type" : "application/json"
        }
      })
      await swalWithBootstrapButtons.fire(
        'Modificado!',
        'El menu se modificó con éxito',
        'success'
      )
      window.location.reload();
    }
  }
  
  return (
    <Fragment>
      <Form className='row m-0 p-2' onSubmit={handleSubmit(modificarDatos)}>
        <Form.Group className='col-md-4 mt-1'>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            placeholder="Ingrese nombre del plato"
            className="input"
            name="nombre"
            minLength={2}
            maxLength={15}
            defaultValue={datosMenu.nombre}
            {
              ...register('nombre',{
                required: {
                  value: true,
                  message: 'Campo requerido'
                }, 
                maxLength: {
                  value: 15,
                  message: 'Debe ser menor a 15'
                },
                minLength: {
                  value: 2,
                  message: 'Debe ser mayor a 2'
                },
                pattern: { 
                  value: /^[A-Za-z0-9\s]+$/i,
                  message: 'Este campo solo acepta Letras, Números y Espacios'
                }
            })}
          ></Form.Control>
          <Form.Text className="text-danger tamLetra">
            {errors.nombre?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="col-md-4 mt-1">
          <Form.Label>Estado</Form.Label>
          <Form.Select 
            className="form-select form-control"
            name="estado"
            defaultValue={datosMenu.estado}
            {...register('estado')}>
            <option value="Disponible">Disponible</option>
            <option value="No disponible">No disponible</option>
          </Form.Select>
          <Form.Text className="text-danger tamLetra d-block">
            {errors.estado?.type === 'required' && "El estado del plato es requerido"}
          </Form.Text>
        </Form.Group>
        <Form.Group className="col-md-4 mt-1">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            placeholder="Ingrese el precio del plato"
            className="input"
            name="precio"
            min={100}
            max={5000}
            defaultValue={datosMenu.precio}
            {
              ...register('precio',{
                required: {
                  value: true,
                  message: 'Campo requerido'
                }, 
                max: {
                  value: 5000,
                  message: 'Debe ser menor a 5000'
                },
                min: {
                  value: 100,
                  message: 'Debe ser mayor a 100'
                },
                pattern: { 
                  value: /^[0-9]+$/i,
                  message: 'Este campo solo acepta Números'
                }
            })}
          ></Form.Control>
          <Form.Text className="text-danger tamLetra d-block">
            {errors.precio?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="col-md-8 mt-3">
          <Form.Label>Detalle</Form.Label>
          <Form.Control
            placeholder="Ingrese el detalle del plato"
            className="input"
            name="detalle"
            minLength={2}
            maxLength={300}
            defaultValue={datosMenu.detalle}
            {
              ...register('detalle',{
                required: {
                  value: true,
                  message: 'Campo requerido'
                }, 
                maxLength: {
                  value: 300,
                  message: 'Debe ser menor a 300'
                },
                minLength: {
                  value: 2,
                  message: 'Debe ser mayor a 2'
                },
                pattern: { 
                  value: /^[a-z0-9A-Z\u00C0-\u017F\s,.]+$/i,
                  message: 'Este campo solo acepta Letras, Números y Espacios'
                }
            })}
          ></Form.Control>
          <Form.Text className="text-danger tamLetra d-block">
            {errors.detalle?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="col-md-4 mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Select 
            name="categoria" 
            defaultValue={datosMenu.categoria}
            {...register('categoria')}>
            <option value="Hamburguesa">Hamburguesa</option>
            <option value="Pizza">Pizza</option>
            <option value="Ensaladas">Ensaladas</option>
            <option value="Bebida con Alcohol">Bebida con Alcohol</option>
            <option value="Bebida sin Alcohol">Bebida sin Alcohol</option>
          </Form.Select>
          <Form.Text className="text-danger tamLetra d-block">
            {errors.categoria?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="col-md-6 mt-3">
          <Form.Label>Ingredientes</Form.Label>
          <Form.Control
            placeholder="Ingrese los ingredientes del plato"
            className="input"
            name="ingredientes"
            minLength={2}
            maxLength={300}
            defaultValue={ingredientes}
            {
              ...register('ingredientes',{
                required: {
                  value: true,
                  message: 'Campo requerido'
                }, 
                maxLength: {
                  value: 300,
                  message: 'Debe ser menor a 300'
                },
                minLength: {
                  value: 2,
                  message: 'Debe ser mayor a 2'
                },
                pattern: { 
                  value: /^[a-z0-9A-Z\u00C0-\u017F\s,.]+$/i,
                  message: 'Este campo solo acepta Letras, Números, Comas y Espacios'
                }
            })}
          ></Form.Control>
          <p className="text-muted">
            Por favor escribir los ingredientes separados con una coma. Por ejemplo: Lechuga, Tomate, Pepinillo.
          </p>
          <Form.Text className="text-danger tamLetra d-block">
            {errors.ingredientes?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="col-md-6 mt-3">
          <Form.Label>Imagen</Form.Label>
          <Form.Control
            placeholder="Ingrese la imagen del plato"
            className="input"
            name="imagen"
            minLength={2}
            maxLength={600}
            defaultValue={datosMenu.imagen}
            {
              ...register('imagen',{
                required: {
                  value: true,
                  message: "La imagen es requerida"
                }, 
                maxLength: {
                  value: 600,
                  message: "El campo debe tener menos de 600 caracteres"
                },
                minLength: {
                  value: 2,
                  message: "Se requiere más de 2 caracteres"
                },
                pattern: { 
                  value: /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i,
                  message: "Este campo solo acepta Links"
                }
            })}
          ></Form.Control>
          <Form.Text className="text-danger tamLetra d-block mb-2">
            {errors.imagen?.message}
          </Form.Text>
        </Form.Group>
        <div className='col-12 mt-4 d-flex justify-content-end'>
          <Button type="submit" variant="outline-light">Guardar</Button>
        </div>
      </Form>
    </Fragment>
  )
  
}

export default FormModMenu