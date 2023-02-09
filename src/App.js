import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import './pages/Inicio/inicio.css'
import FormRegister from './components/FormRegister/FormRegister';
import Navbar from './components/Navbar/Navbar';
import Admin from './pages/Admin/Admin';
import AdminMenus from './pages/Admin/AdminMenus';
import AdminPedidos from './pages/Admin/AdminPedidos';
import AdminUsuarios from './pages/Admin/AdminUsuarios';
import Inicio from './pages/Inicio/Inicio';
import Categoria from './pages/Categoria/Categoria';



function App() {
  return (

    <>
      <Navbar title={'Restaurante Rolling'} />
      <div className='mb-5'>
        <Routes>
          <Route path='/admin' element={<Admin></Admin>}/>
          <Route path='/adminMenus' element={<AdminMenus/>}/>
          <Route path='/adminPedidos' element={<AdminPedidos/>}/>
          <Route path='/adminUsuarios' element={<AdminUsuarios/>}/>
          <Route path='/registrarUsuario' element={<FormRegister/>}/>
          <Route path='/' element={<Inicio/>}/>
        </Routes>
      </div>
      <div className='position-relative margenFooter'>
        <Footer />
      </div>
    </>
  );
}

export default App;
