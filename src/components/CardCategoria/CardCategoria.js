import React from 'react'
import './cardCategoria.css'

const CardCategoria = () => {
  return (
<>
<div className="card mb-3 tarjeta"> 
  <div className="row g-0">
    <div className="col-md-4">
      <img src="https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c1aa.png" className="img-fluid rounded-start" alt="imagen"/>
    </div>
    <div className="col-md-8">
      <div className="card-body ">
        <div className='d-flex justify-content-between'>
        <h5 className="card-titles fs-2 fw-bold">Big Yola</h5>
          <h3 className='fw-bold'>$1000</h3>
        </div>
        <p className="card-text p-4 fs-5">Medallon de 150 gr., doble queso cheddar, panceta ahumada, cebolla caramelizada y huevo.</p>
      </div>
    </div>
  </div>
</div>

</>

  )
}

export default CardCategoria