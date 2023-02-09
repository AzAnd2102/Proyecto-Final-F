import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import FilaTablaUsuarios from '../FilaTablaUsuarios/FilaTablaUsuarios';

function TablaUsuarios() {
  const [datos, setDatos] = useState([]);

  const obtenerDatos = async () => {
    const baseURL = process.env.REACT_APP_API_URL;
    const respuesta = await fetch(`${baseURL}/usuarios/obtenerUsuarios`)
    const usuarios = await respuesta.json()

    setDatos(usuarios)
  }

  useEffect(()=>{obtenerDatos()},[])

  return (
    <div className='container mt-3 mb-5'>
      <Table responsive size="sm" className='mb-5'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Estado</th>
            <th>Email</th>
            <th>Rol</th>
            <th className='text-center'>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {
            datos.map(user => <FilaTablaUsuarios id={user._id} email={user.email} nombre={user.nombre} apellido={user.apellido} estado={user.estado} rol={user.rol}/>)
          }
        </tbody>
      </Table>
    </div>
  );
}

export default TablaUsuarios;