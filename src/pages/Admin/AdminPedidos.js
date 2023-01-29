import React from 'react'
import TablaPedidos from '../../components/TablaPedidos/TablaPedidos'
import 'transition-style'

function AdminPedidos() {
  return (
    <div transition-style="in:wipe:bottom-right">
      <h1 className='text-center my-5'>Administrar Pedidos</h1>
      <TablaPedidos/>
    </div>
  )
}

export default AdminPedidos