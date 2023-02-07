import React from 'react'
import './inicio.css'


const Inicio = () => {
  return (
    <>
    <div className="card text-bg-dark w-100">
    <img className= "img" src="https://images.pexels.com/photos/15141035/pexels-photo-15141035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="imagen" />
    <div className="card-img-overlay">
      <h1 className="card-title">Busca Tu Plato Preferido</h1>
      <div className="form">
    <input type="text" className="form-control p-2" id="formGroupExampleInput" placeholder="Escribe el nombre del plato"></input></div>
    <label htmlFor="formGroupExampleInput" className="form-label"></label></div>
      <h1 className="titulo">Nuestros Platos</h1>
    <div className="card-body row bg-warning">
                <div className='column col-3 text-center'>
                    <div>
                    <img className= "iconoBurg mb-3" src= "https://cdn.icon-icons.com/icons2/1447/PNG/512/32382hamburger_98925.png" alt="imagen"/></div>
                    <div><h3>Hamburguesas</h3></div>
                </div>
                <div className='column col-3 text-center'>
                    <div>
                    <img className= "iconoBurg mb-3" src= "https://cdn.pixabay.com/photo/2022/10/06/22/22/pizza-7503664_960_720.png" alt="imagen"/></div>
                    <div><h3>Pizzas</h3></div>
                </div>
                <div className='column col-3 text-center'>
                    <div>
                    <img className= "iconoBurg mb-3" src= "https://cdn-icons-png.flaticon.com/512/2674/2674069.png" alt="imagen"/></div>
                    <div><h3>Ensaladas</h3></div>
                </div>
                <div className='column col-3 text-center'>
                    <div>
                    <img className= "iconoBurg mb-3" src= "https://img.freepik.com/iconos-gratis/botella_318-275086.jpg" alt="imagen"/></div>
                    <div><h3>Bebidas</h3></div>
                </div>
      
      <p className="card-text"><small className="text-muted"></small></p></div>
  </div>
  </>
  )
}

export default Inicio