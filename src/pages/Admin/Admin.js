import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import ModalMod from '../../components/ModalMod/ModalMod';
import TablaMenus from '../../components/TablaMenus/TablaMenus'
import TablaPedidos from '../../components/TablaPedidos/TablaPedidos';

import './admin.css'

function Admin() {

  return (
    <>
      <div className='row m-0 p-0 d-flex justify-content-center mt-5'>
        <div className="card animate__animated animate__fadeInLeft m-5 col-lg-4 col-12" style={{width: "18rem"}}>
          <img src="https://cdn-icons-png.flaticon.com/512/3246/3246812.png" className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title text-center"><Link className='Link' to='/adminPedidos'>Pedidos</Link></h5>
          </div>
        </div>
        <div className="card animate__animated animate__fadeInLeft m-5 col-lg-4 col-12" style={{width: "18rem"}}>
          <img src="https://cdn-icons-png.flaticon.com/512/1046/1046747.png" className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title text-center"><Link className='Link' to='/adminMenus'>Menu</Link></h5>
          </div>
        </div>
        <div className="card animate__animated animate__fadeInLeft m-5 col-lg-4 col-12" style={{width: "18rem"}}>
          <img src="https://cdn-icons-png.flaticon.com/512/554/554795.png" className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title text-center"><Link className='Link' to='/adminUsuarios'>Usuarios</Link></h5>
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin