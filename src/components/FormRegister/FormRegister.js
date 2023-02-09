import React from 'react'
import { Button, Form } from 'react-bootstrap';
import logo from "../../assets/icons/logo.png";
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const FormRegister = () => {
  const {register, formState: { errors }, handleSubmit} = useForm();
  const baseURL = process.env.REACT_APP_API_URL;

  const procesarFormulario = async (data, e) => {
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
      text: "Quiere crear este usuario",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, agregar',
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
          'El usuario no se agrego',
          'error'
        )
      }
    })
    
    if (bandera) {
      const respuesta = await fetch(`${baseURL}/usuarios/registrarUsuario`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          "Content-Type" : "application/json"
        }
      })


      if (respuesta.status === 400) {
        await swalWithBootstrapButtons.fire(
          'El usuario ya existe!',
          'Encontramos que el email ya pertenece a un usuario existente, por favor ingrese otro',
          'error'
        )
        e.target.reset();
        window.location.reload();

      } else {
        await swalWithBootstrapButtons.fire(
          'Agregado!',
          'El usuario fue creado con éxito',
          'success'
        )
        const user = await respuesta.json();
        const respuestaPedidos = await fetch(`${baseURL}/pedidos/obtenerPedidos`)
        const pedidos = await respuestaPedidos.json()
        let today = new Date();
        let now = today.toLocaleString();
        let tamPed = (pedidos.length) + 1;
        localStorage.setItem('rol', user.nuevoUsuario.rol)
        localStorage.setItem('userId', user.nuevoUsuario._id)
        localStorage.setItem('pedidoId', `pedido-${tamPed}-${now}`)
        localStorage.setItem('token',user.token)
        e.target.reset();
        window.location.reload();
        window.location.href = "/";
      }
    }
  }

  return (
    <>
      <div className='w-100 m-auto'>
        <div className='d-flex justify-content-center mt-5'>
          <img className=' image-logo' src={logo} alt='modal-logo'/>
        </div>
        <div className='text-center m-0 p-0'>
          <h3>¡Bienvenido!</h3>
        </div>
        <div className='d-flex justify-content-center'>

        <Form className='row m-0 p-2' onSubmit={handleSubmit(procesarFormulario)}>
          <Form.Group className='col-md-6 mt-2'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
            //Se modifica el placeholder
              placeholder="Ingrese su nombre"
              className="input"
              name="nombre"
              minLength={2}
              maxLength={15}
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
                    value: /^[a-zA-Z\u00C0-\u017F\s]+$/i,
                    message: 'Este campo solo acepta Letras y Espacios'
                  }
              })}
            ></Form.Control>
            <Form.Text className="text-danger tamLetra">
              {errors.nombre?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className='col-md-6 mt-2'>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              placeholder="Ingrese su apellido"
              className="input"
              name="apellido"
              minLength={2}
              maxLength={25}
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
                    value: /^[a-zA-Z\u00C0-\u017F\s]+$/i,
                    message: 'Este campo solo acepta Letras y Espacios'
                  }
              })}
            ></Form.Control>
            <Form.Text className="text-danger tamLetra">
              {errors.apellido?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className='col-12 mt-3'>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              placeholder="Ingrese una contraseña"
              type="password"
              name="password"
              minLength={8}
              maxLength={30}
              {
                ...register('password',{
                  required: {
                    value: true,
                    message: 'Campo requerido'
                  }, 
                  maxLength: {
                    value: 30,
                    message: 'Debe ser menor a 30'
                  },
                  minLength: {
                    value: 8,
                    message: 'Debe ser mayor a 8'
                  },
                  pattern: { 
                    value: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,30}$/i,
                    message: 'La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.'
                  }
              })}
            ></Form.Control>
            <Form.Text className="text-danger tamLetra">
              {errors.password?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="col-12 mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="Ingrese el email del Usuario"
              className="email"
              name="email"
              minLength={2}
              maxLength={300}
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
            <Button type="submit" variant="outline-dark">Registrar</Button>
          </div>
        </Form>
        </div>
      </div>
    </>
  )
}

export default FormRegister