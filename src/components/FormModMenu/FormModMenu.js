import React, { useEffect, useState } from 'react'
let ingredientes = '';

const FormModMenu = (props) => {

  const baseURL = 'http://localhost:8000';
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
  }
  
  return (
    <div>
      <form className="row m-2 p-0" onSubmit={modificarDatos}>
        <div className="col-md-4 mt-1">
          <label for="nombre" class="form-label mb-0">Nombre</label>
          <input type="text" placeholder="Nombre" className="form-control" onChange={handleInputChange} name="nombre" value={datosMenu.nombre}></input>
        </div>
        <div className="col-md-4 mt-1">
          <label for="estado" class="form-label mb-0">Estado</label>
          <input type="text" placeholder="Estado" className="form-control" onChange={handleInputChange} name="estado" value={datosMenu.estado}></input>
        </div>
        <div className="col-md-4 mt-1">
          <label for="precio" class="form-label mb-0">Precio</label>
          <input type="number" placeholder="Precio" className="form-control" onChange={handleInputChange} name="precio" value={datosMenu.precio}></input>
        </div>
        <div className="col-md-8 mt-3">
          <label for="detalle" class="form-label mb-0">Detalle</label>
          <input type="text" placeholder="Detalle" className="form-control" onChange={handleInputChange} name="detalle" value={datosMenu.detalle}></input>
        </div>
        <div className="col-md-4 mt-3">
          <label for="categoria" class="form-label mb-0">Categoria</label>
          <input type="text" placeholder="Categoria" className="form-control" onChange={handleInputChange} name="categoria" value={datosMenu.categoria}></input>
        </div>
        <div className="col-md-6 mt-3">
          <label for="ingredientes" class="form-label mb-0">Ingredientes</label>
          <input type="text" placeholder="Ingredientes" className="form-control" onChange={handleInputChange} name="ingredientes" value={ingredientes}></input>
        </div>
        <div className="col-md-6 mt-3">
          <label for="imagen" class="form-label mb-0">Imagen</label>
          <input type="text" placeholder="Imagen" className="form-control" onChange={handleInputChange} name="imagen" value={datosMenu.imagen}></input>
        </div>
        <div className='col-12 mt-4 d-flex justify-content-end'>
          <button type="submit" className="btn btn-outline-light">Guardar</button>
        </div>
    </form>
    </div>
  )
  
}

export default FormModMenu