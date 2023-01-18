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

    console.log(respuesta)

  }
 
  return (
    <Fragment>
        <h1>Formulario</h1>
        <form className="row" onSubmit={enviarDatos}>
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
    </Fragment>
);

}

export default FormAltaMenu;