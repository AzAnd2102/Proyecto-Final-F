import React, { useEffect, useState } from 'react'
let ingredientes = '';

const InfoMenu = (props) => {
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

  return (
    <>
      <div className='row m-0 p-0'>
        <div className='col-md-5 p-1 mt-2 d-flex justify-content-center'>
          <img src={datosMenu.imagen} className="card-img-top" alt="..." />
        </div>
        <div className='col-md-7 p-1 mt-2'>
          <p className='fw-bold fs-4'>{datosMenu.categoria}</p>
          <p>{datosMenu.detalle}</p>
          <p>{ingredientes}</p>
          <p className='fw-bold fs-4'>Precio ${datosMenu.precio}</p>
        </div>
      </div>
    </>
  )
}

export default InfoMenu