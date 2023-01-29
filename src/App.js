import { Route, Routes } from 'react-router-dom';
import './App.css';
import Admin from './pages/Admin/Admin';
import AdminMenus from './pages/Admin/AdminMenus';
import AdminPedidos from './pages/Admin/AdminPedidos';
import AdminUsuarios from './pages/Admin/AdminUsuarios';

function App() {
  return (
    <>
      <Routes>
        <Route path='/admin' element={<Admin></Admin>}/>
        <Route path='/adminMenus' element={<AdminMenus/>}/>
        <Route path='/adminPedidos' element={<AdminPedidos/>}/>
        <Route path='/adminUsuarios' element={<AdminUsuarios/>}/>
      </Routes>
    </>
  );
}

export default App;
