import React, { useEffect, useState } from 'react'
import Card from '../CardMenu/CardMenu';

const TablaMenus = () => {

  const [datos, setDatos] = useState([]);

  const obtenerDatos = async () => {
    const baseURL = 'http://localhost:8000';
    const respuesta = await fetch(`${baseURL}/menus/obtenerMenus`)
    const menus = await respuesta.json()

    setDatos(menus)
  }

  useEffect(()=>{obtenerDatos()},[])

  return (
    <>
      <div className='d-flex justify-content-evenly row m-0 p-0'>
          {
            datos.map(menu => <Card id={menu._id} nombre={menu.nombre} categoria={menu.categoria} imagen={menu.imagen} precio={menu.precio} />)
          }
      </div>
    </>
  )
}

export default TablaMenus