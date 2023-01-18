import React, { Fragment, useEffect, useState } from 'react'

const FormModMenu = (props) => {

  console.log('hola ' +props.id)

  const baseURL = 'http://localhost:8000';

  const obtenerDatos = async () => {
    const respuesta = await fetch(`${baseURL}/menus/obtenerUnMenu/${props.id}`)
    const menus = await respuesta.json()

    console.log(menus)
  }

  useEffect(()=>{
    obtenerDatos()
  },[])
  

  const [datos, setDatos] = useState({
    _id: props.id,
    nombre: '',
    estado: '',
    precio: 0,
    detalle: '',
    ingredientes: [],
    categoria: '',
    imagen: ''
  });

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name] : event.target.value
    })
  }

  console.log('holla ' +props.id)

  const modificarDatos = async (event) => {
    event.preventDefault()
    console.log('Entro aqui ' + datos.nombre)
    const respuesta = await fetch(`${baseURL}/menus/modificarMenu/${props.id}`,{
      method: 'PUT',
      body: JSON.stringify(datos),
      headers:{
        "Content-Type" : "application/json"
      }
    })
    console.log(respuesta)

  }
  

  console.log('holla ' +props.id)
  return (
    <div>
      <p>Hola</p>
      <form className="row" onSubmit={modificarDatos}>
        <div className="col-md-3">
            <input type="text" placeholder="Nombre" className="form-control" onChange={handleInputChange} name="nombre"></input>
        </div>
        <div className="col-md-3">
            <input type="text" placeholder="Estado" className="form-control" onChange={handleInputChange} name="estado"></input>
        </div>
        <div className="col-md-3">
            <input type="number" placeholder="Precio" className="form-control" onChange={handleInputChange} name="precio"></input>
        </div>
        <div className="col-md-3">
            <input type="text" placeholder="Detalle" className="form-control" onChange={handleInputChange} name="detalle"></input>
        </div>
        <div className="col-md-3">
            <input type="text" placeholder="Ingredientes" className="form-control" onChange={handleInputChange} name="ingredientes"></input>
        </div>
        <div className="col-md-3">
            <input type="text" placeholder="Categoria" className="form-control" onChange={handleInputChange} name="categoria"></input>
        </div>
        <div className="col-md-3">
            <input type="text" placeholder="Imagen" className="form-control" onChange={handleInputChange} name="imagen"></input>
        </div>
        <button type="submit" className="btn btn-primary">Enviar</button>
    </form>
    </div>
  )
  
}

export default FormModMenu