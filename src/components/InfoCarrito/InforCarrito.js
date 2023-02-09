import React from 'react'

function InforCarrito({carrito}) {
  return (
    <>
      {
        carrito.map(carrito => (
        <div className='row m-0 p-0 mb-4 border-bottom '>
          <p className='col-8 fw-bold fs-5 mt-1'>{carrito.nombrePlato}</p>
          <p className='col-4 fw-bold fs-5 mt-1 text-end'>${carrito.precio}</p>
          <p>{(carrito.ingredientes.map(ingrediente => (`${ingrediente}.  `)))}</p>
        </div>
      ))
      }
    </>
  )
}

export default InforCarrito