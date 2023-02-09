import React, { useEffect, useState } from 'react'
import './inicio.css'
import burguer from '../../assets/icons/hamburguesa.png'
import pizza from '../../assets/icons/pizza.png'
import ensalada from '../../assets/icons/ensalada.png'
import soda from '../../assets/icons/soda.png'
import CardCategoria from '../../components/CardCategoria/CardCategoria'
import { Button, Form} from 'react-bootstrap'
import { useForm } from 'react-hook-form'


const Inicio = () => {

  const [datos, setDatos] = useState([]);

  const obtenerDatos = async () => {
    const baseURL = process.env.REACT_APP_API_URL;
    const respuesta = await fetch(`${baseURL}/menus/obtenerMenus`)
    const menus = await respuesta.json()

    setDatos(menus)
  }

  useEffect(()=>{obtenerDatos()},[])

  const {register, formState: { errors }, handleSubmit} = useForm();

  const procesarFormulario = (data,e) =>{
    datos.map(plato =>{
      if (plato.nombre.toLowerCase() === data.nombre.toLowerCase()) {
        window.location.replace(`#${plato.nombre}`)
        e.target.reset()
      }
    })
  }
  return (
    <div className='mb-5'>
      <div className="border-0 bg-dark mb-5">
        <div className='position-relative m-0 p-0'>
          <img className= "img-Inicio" src="https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="imagen" />
          <div className="position-absolute top-50 start-50 translate-middle">
            <h3 className="text-white text-center">Busca Tu Plato Preferido</h3>
            <div>
              <Form onSubmit={handleSubmit(procesarFormulario)} className="row m-0 p-0">
                <div className='col-8 col-md-10'>
                  <Form.Group>
                    <Form.Control
                      placeholder="Ingrese nombre del plato"
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
                            value: /^[A-Za-z0-9\s]+$/i,
                            message: 'Este campo solo acepta Letras, Números y Espacios'
                          }
                      })}
                    ></Form.Control>
                    <Form.Text className="text-danger tamLetra">
                      {errors.nombre?.message}
                    </Form.Text>
                  </Form.Group>
                </div>
                <div className='col-4 col-md-2'>
                  <Button type="submit" variant="outline-light"><i class="bi bi-search"></i></Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
        <h1 className="titulo text-white my-3">Nuestros Platos</h1>
        <div className="card-body row m-0 p-0">
          <div className='column col-6 col-md-3 text-center my-3'>
            <img className= "w-50 mb-3" src={burguer} alt="imagen"/>
            <h3><a className='text-decoration-none text-white' href='#Hamburguesas'>Hamburguesas</a></h3>
          </div>
          <div className='column col-6 col-md-3 text-center my-3'>
            <img className= "w-50 mb-3" src={pizza} alt="imagen"/>
            <h3><a className='text-decoration-none text-white' href='#Pizzas'>Pizzas</a></h3>
          </div>
          <div className='column col-6 col-md-3 text-center my-3'>
            <img className= "w-50 mb-3" src={ensalada} alt="imagen"/>
            <h3><a className='text-decoration-none text-white' href='#Ensaladas'>Ensaladas</a></h3>
          </div>
          <div className='column col-6 col-md-3 text-center my-3'>
            <img className= "w-50 mb-3" src={soda} alt="imagen"/>
            <h3><a className='text-decoration-none text-white' href='#Bebidas'>Bebidas</a></h3>
          </div>
        </div>
      </div>
      <h1 className='my-5 text-center fw-bold font-monospace'><a className='text-decoration-none text-black' id='Hamburguesas'>Nuestras Hamburguesas</a></h1>
      <div className='row m-0 p-0'>
        {
          datos.map(menu => 
          menu.categoria === "Hamburguesa" && menu.estado === "Disponible"?
          <CardCategoria nombre={menu.nombre} categoria={menu.categoria} precio={menu.precio} detalle={menu.detalle} ingredientes={menu.ingredientes}/> : null)
        }
      </div>
      <h1 className='my-5 text-center fw-bold font-monospace'><a className='text-decoration-none text-black' id='Pizzas'>Nuestras Pizzas</a></h1>
      <div className='row m-0 p-0'>
        {
          datos.map(menu => 
          menu.categoria === "Pizza" && menu.estado === "Disponible"?
          <CardCategoria nombre={menu.nombre} categoria={menu.categoria} precio={menu.precio} detalle={menu.detalle} ingredientes={menu.ingredientes}/> : null)
        }
      </div>
      <h1 className='my-5 text-center fw-bold font-monospace'><a className='text-decoration-none text-black' id='Ensaladas'>Nuestras Ensaladas</a></h1>
      <div className='row m-0 p-0'>
        {
          datos.map(menu => 
          menu.categoria === "Ensaladas" && menu.estado === "Disponible"?
          <CardCategoria nombre={menu.nombre} categoria={menu.categoria} precio={menu.precio} detalle={menu.detalle} ingredientes={menu.ingredientes}/> : null)
        }
      </div>
      <h1 className='my-5 text-center fw-bold font-monospace'><a className='text-decoration-none text-black' id='Bebidas'>Nuestras Bebidas</a></h1>
      <div className='row m-0 p-0'>
        {
          datos.map(menu => 
          (menu.categoria === "Bebida con Alcohol" || menu.categoria === "Bebida sin Alcohol") && menu.estado === "Disponible"?
          <CardCategoria nombre={menu.nombre} categoria={menu.categoria} precio={menu.precio} detalle={menu.detalle} ingredientes={menu.ingredientes}/> : null)
        }
      </div>
    </div>
  )
}

export default Inicio