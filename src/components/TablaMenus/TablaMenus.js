import React, { useState } from 'react'
import Card from '../CardMenu/CardMenu';

const TablaMenus = () => {

  const [datos, setDatos] = useState([]);

  const obtenerDatos = async () => {
    const baseURL = 'http://localhost:8000';
    const respuesta = await fetch(`${baseURL}/menus/obtenerMenus`)
    const menus = await respuesta.json()

    setDatos(menus)
    console.log(datos)
    //console.log(menus)
  }

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={obtenerDatos}>Enviar</button>
      <div className='d-flex justify-content-evenly'>
          {
            datos.map(menu => <Card id={menu._id} nombre={menu.nombre} categoria={menu.categoria} imagen={menu.imagen} precio={menu.precio} />)
          }
      </div>
    </>
  )
}

export default TablaMenus