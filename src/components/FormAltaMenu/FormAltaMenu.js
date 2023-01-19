import React, {Fragment, useState} from 'react';

const FormAltaMenu = () => {

  const baseURL = 'http://localhost:8000';

  const [datos, setDatos] = useState({
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

  const enviarDatos = async (event) => {
    event.preventDefault()

    const respuesta = await fetch(`${baseURL}/menus/crearMenu`,{
      method: 'POST',
      body: JSON.stringify(datos),
      headers:{
        "Content-Type" : "application/json"
      }
    })
  }
 
  return (
    <Fragment>
      <form className="row m-2 p-0" onSubmit={enviarDatos}>
        <div className="col-md-4 mt-1">
          <label for="nombre" class="form-label mb-0">Nombre</label>
          <input type="text" placeholder="Nombre" className="form-control" onChange={handleInputChange} name="nombre"></input>
        </div>
        <div className="col-md-4 mt-1">
          <label for="estado" class="form-label mb-0">Estado</label>
          <input type="text" placeholder="Estado" className="form-control" onChange={handleInputChange} name="estado"></input>
        </div>
        <div className="col-md-4 mt-1">
          <label for="precio" class="form-label mb-0">Precio</label>
          <input type="number" placeholder="Precio" className="form-control" onChange={handleInputChange} name="precio"></input>
        </div>
        <div className="col-md-8 mt-3">
          <label for="detalle" class="form-label mb-0">Detalle</label>
          <input type="text" placeholder="Detalle" className="form-control" onChange={handleInputChange} name="detalle"></input>
        </div>
        <div className="col-md-4 mt-3">
          <label for="categoria" class="form-label mb-0">Categoria</label>
          <input type="text" placeholder="Ingredientes" className="form-control" onChange={handleInputChange} name="ingredientes"></input>
        </div>
        <div className="col-md-6 mt-3">
          <label for="ingredientes" class="form-label mb-0">Ingredientes</label>
          <input type="text" placeholder="Categoria" className="form-control" onChange={handleInputChange} name="categoria"></input>
        </div>
        <div className="col-md-6 mt-3">
          <label for="imagen" class="form-label mb-0">Imagen</label>
          <input type="text" placeholder="Imagen" className="form-control" onChange={handleInputChange} name="imagen"></input>
        </div>
        <div className='col-12 mt-4 d-flex justify-content-end'>
          <button type="submit" className="btn btn-outline-light">Guardar</button>
        </div>
      </form>
    </Fragment>
);

}

export default FormAltaMenu;