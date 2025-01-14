import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import Logo from '../../Assets/icons/Logo.png'
const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setError(true)
      return;
    }

    setError(false)
    alert('Iniciaste sesión: ' + email);

  }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center shadow-login ' style={{ height: '100vh' }}>
      <div className='bg-Secondary p-3 col-10 col-sm-8 col-md-9 col-lg-6'>

        <div className='d-flex justify-content-between fs-4'>
          <p className='ThirdText  '>¡Bienvenido!</p>
          <Link to="/Registrarse" className='PrimaryColor text-decoration-none' >Registrarse</Link>
        </div>

        <form className="col-9 col-sm-8 col-md-6 col-lg-6 mx-auto" onSubmit={handleSubmit}>
          <div className="mb-3 d-flex flex-column">
            <label htmlFor="email" className="FourthText">Correo Electronico</label>
            <input type="email" className="input-login" id="email" placeholder="Ingrese correo  electronico" onChange={(e) => (setEmail(e.target.value))} />
            {(error || email !== '') && <p className='text-danger m-0 p-0'>Ingrese el correo electronico</p>}
          </div>

          <div className="mb-3 d-flex flex-column">
            <label htmlFor="password" className="FourthText">Contraseña</label>
            <input type="password" className="input-login" id="password" placeholder="Ingrese su clave" onChange={(e) => (setPassword(e.target.value))} />
            {(error || password !== '') && <p className='text-danger m-0 p-0'>Ingrese la contraseña</p>}
          </div>
          <button type="submit" className="bg-Primary SecondaryText w-100 border-0 p-1 rounded-1 mb-3" onClick={handleSubmit}>Iniciar Sesion</button>
        </form>
      </div>

      <div className='bg-Primary justify-content-center align-items-center d-flex flex-column p-2 col-10 col-sm-8 col-md-9 col-lg-6'>
        <img src={Logo} className='w-50'></img>
      </div>
    </div>
  )
}

export default Login
