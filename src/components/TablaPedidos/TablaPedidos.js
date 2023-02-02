import React, { Fragment, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import FilaTablaPedidos from '../FilaTablaPedidos/FilaTablaPedidos';

function TablaPedidos() {
  const [datos, setDatos] = useState([]);

  const obtenerDatos = async () => {
    const baseURL = 'http://localhost:8000';
    const respuesta = await fetch(`${baseURL}/pedidos/obtenerPedidos`)
    const usuarios = await respuesta.json()

    setDatos(usuarios)
  }

  useEffect(()=>{obtenerDatos()},[])

  return (
    <div className='container mt-3'>
      <Table responsive size="sm">
        <thead variant="dark">
          <tr>
            <th>NroPedido</th>
            <th>Nombre y Apellido</th>
            <th>Monto Total</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th className='text-center'>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {
            datos.map(pedido => <FilaTablaPedidos id={pedido._id} idUsuario={pedido.usuarioID} carrito={pedido.carrito} estado={pedido.estado} monto={pedido.total} fecha={pedido.fecha}/>)
          }
        </tbody>
      </Table>
    </div>
  )
}

export default TablaPedidos