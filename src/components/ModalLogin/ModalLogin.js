import React from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

import logo from "../../assets/icons/logo.png";
import { Link } from 'react-router-dom';

const ModalLogin = ({ show, handleClose }) => {
  const {register, formState: { errors }, handleSubmit} = useForm();
  const baseURL = 'http://localhost:8000';


  const procesarFormulario = async (data,e) =>{
    const respuesta = await fetch(`${baseURL}/usuarios/loginUsuario`,{
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        "Content-Type" : "application/json"
      }
    })
    if (respuesta.status === 404) {
      await Swal.fire(
        'Usuario no encontrado!',
        'Lamentablemente el email ingresado no coincide con un usuario existente, por favor ingrese otro.',
        'error'
      )
    } else if (respuesta.status === 403){
      await Swal.fire(
        'Contraseña incorrecta!',
        'La contraseña es incorrecta',
        'error'
      )
    } else if (respuesta.status === 200) {
      await Swal.fire(
        'Bienvenido!',
        'Estas listo para elegir delicias?',
        'success'
      )
      const user = await respuesta.json();
      const respuestaPedidos = await fetch(`${baseURL}/pedidos/obtenerPedidos`)
      const pedidos = await respuestaPedidos.json()
      let today = new Date();
      let now = today.toLocaleString();
      let tamPed = (pedidos.length) + 1;
      localStorage.setItem('rol', user.result.rol)
      localStorage.setItem('userId', user.result._id)
      localStorage.setItem('pedidoId', `pedido-${tamPed}-${now}`)
      localStorage.setItem('token',user.token)
    }
    window.location.reload();
    window.location.href = "/";
    e.target.reset();
  }


  return (
    
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='container-fluid text-center'>
            <img className='image-logo' src={logo} alt='modal-logo'/>
            <div className='bienvenida-text my-2'>
              <span>¡Te damos la bienvenida!</span>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body d-flex align-content-center justify-content-center'>
          <div>
            <Form className='row m-0 p-2' onSubmit={handleSubmit(procesarFormulario)}>
              <Form.Group className="col-12">
                <Form.Label className='mb-1'>Email</Form.Label>
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
              <Form.Group className='col-12 mt-3'>
                <Form.Label className='mb-1'>Contraseña</Form.Label>
                <Form.Control
                  placeholder="Ingrese la contraseña del Usuario"
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
              <div className='mt-3'>
                <div className='text-registro text-center mb-1'>
                  <a className='text-decoration-none text-dark' href='...'>¿Olvidaste tu contraseña? </a>
                </div>
                <div className='text-registro text-center'>
                  <Link className='text-decoration-none text-dark' to='/registrarUsuario' onClick={handleClose}>¿No tienes cuenta? Regístrate</Link>
                </div>
              </div>
              <Modal.Footer className='mt-3 mb-0'>
                <div className='col-12 mt-1 mb-0 d-flex justify-content-end'>
                  <Button type="submit" variant="outline-dark" onClick={handleClose}>Iniciar Sesión</Button>
                </div>
              </Modal.Footer>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
 );
};

export default ModalLogin;