import React, { Fragment, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

function FormModUsuario({id}) {
  
  const {register, formState: { errors }, handleSubmit} = useForm();
  const baseURL = 'http://localhost:8000';
  const [datosUsuario, setDatosUsuario] = useState([]);

   const obtenerDatos = async () => {
    const respuesta = await fetch(`${baseURL}/usuarios/obtenerUnUsuario/${id}`)
    const menus = await respuesta.json()
    setDatosUsuario(menus);
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
      text: "Quiere modificar este usuario",
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
          'El usuario no se modificó',
          'error'
        )
      }
    })


    if (bandera) {
      const respuesta = await fetch(`${baseURL}/usuarios/modificarUsuario/${id}`,{
        method: 'PUT',
        body: JSON.stringify(data),
        headers:{
          "Content-Type" : "application/json"
        }
      })
      
      if (respuesta.status === 400) {
        await swalWithBootstrapButtons.fire(
          'Cambiaste el correo por uno ya existente!',
          'Cada usuario debe contener un correo distinto, por favor respete eso.',
          'error'
        )
        window.location.reload();
      } else {
        await swalWithBootstrapButtons.fire(
          'Modificado!',
          'El usuario se modificó con éxito',
          'success'
        )
        window.location.reload();
      }
    }
  }

  return (
    <Fragment>
      <Form className='row m-0 p-2' onSubmit={handleSubmit(modificarDatos)}>
        <Form.Group className='col-md-4 mt-1'>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            placeholder="Ingrese nombre del Usuario"
            className="input"
            name="nombre"
            minLength={2}
            maxLength={15}
            defaultValue={datosUsuario.nombre}
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
                  value: /^[A-Za-z\s]+$/i,
                  message: 'Este campo solo acepta Letras y Espacios'
                }
            })}
          ></Form.Control>
          <Form.Text className="text-danger tamLetra">
            {errors.nombre?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className='col-md-4 mt-1'>
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            placeholder="Ingrese nombre del Usuario"
            className="input"
            name="apellido"
            minLength={2}
            maxLength={25}
            defaultValue={datosUsuario.apellido}
            {
              ...register('apellido',{
                required: {
                  value: true,
                  message: 'Campo requerido'
                }, 
                maxLength: {
                  value: 25,
                  message: 'Debe ser menor a 15'
                },
                minLength: {
                  value: 2,
                  message: 'Debe ser mayor a 2'
                },
                pattern: { 
                  value: /^[A-Za-z\s]+$/i,
                  message: 'Este campo solo acepta Letras y Espacios'
                }
            })}
          ></Form.Control>
          <Form.Text className="text-danger tamLetra">
            {errors.apellido?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="col-md-4 mt-1">
          <Form.Label for="estado">Estado</Form.Label>
          <Form.Select 
            class="form-select form-control"
            name="estado"
            defaultValue={datosUsuario.estado}
            {...register('estado')}>
            <option value="activo">Activo</option>
            <option value="no activo">No activo</option>
          </Form.Select>
          <Form.Text className="text-danger tamLetra d-block">
            {errors.estado?.type === 'required' && "El estado del usuario es requerido"}
          </Form.Text>
        </Form.Group>
        <Form.Group className="col-md-4 mt-3">
          <Form.Label>Rol</Form.Label>
          <Form.Select 
            name="rol" 
            defaultValue={datosUsuario.rol}
            {...register('rol')}>
            <option value="admin">Admin</option>
            <option value="usuario">Usuario</option>
          </Form.Select>
          <Form.Text className="text-danger tamLetra d-block">
            {errors.rol?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="col-md-6 mt-3">
          <Form.Label for="ingredientes">Email</Form.Label>
          <Form.Control
            placeholder="Ingrese el email del Usuario"
            className="input"
            name="email"
            minLength={2}
            maxLength={300}
            defaultValue={datosUsuario.email}
            {
              ...register('email',{
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
                  value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
                  message: 'Este campo solo acepta Correos Electrónicos'
                }
            })}
          ></Form.Control>
          <Form.Text className="text-danger tamLetra d-block">
            {errors.email?.message}
          </Form.Text>
        </Form.Group>
        <div className='col-12 mt-4 d-flex justify-content-end'>
          <Button type="submit" variant="outline-light">Guardar</Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default FormModUsuario