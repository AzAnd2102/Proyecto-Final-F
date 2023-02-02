import { Route, Routes } from 'react-router-dom';
import './App.css';
import FormRegister from './components/FormRegister/FormRegister';
import Navbar from './components/Navbar/Navbar';
import Admin from './pages/Admin/Admin';
import AdminMenus from './pages/Admin/AdminMenus';
import AdminPedidos from './pages/Admin/AdminPedidos';
import AdminUsuarios from './pages/Admin/AdminUsuarios';

function App() {
  return (
    


    <>
     <Navbar title={'Restaurante Rolling'} />
     <div class="card text-bg-dark">
      <img src="https://images.pexels.com/photos/15141035/pexels-photo-15141035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" class="card-img" alt="imagen" />
      <div class="card-img-overlay">
        <h1 class="card-title">Busca Tu Plato Preferido</h1>
        <div class="form">
      <label for="formGroupExampleInput" class="form-label"></label>
      <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Escribe el nombre del plato"></input> </div>
      </div>
      <div class="card-body bg-warning">
        <h1 class="titulo">Nuestros Platos</h1>
        <p class="card-text">......</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
      <Routes>
        <Route path='/admin' element={<Admin></Admin>}/>
        <Route path='/adminMenus' element={<AdminMenus/>}/>
        <Route path='/adminPedidos' element={<AdminPedidos/>}/>
        <Route path='/adminUsuarios' element={<AdminUsuarios/>}/>
        <Route path='/registrarUsuario' element={<FormRegister/>}/>
      </Routes>
    </>
  );
}

export default App;
