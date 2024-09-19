import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = ({url}) => {
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const [ data, setData ] = useState({
        email: "",
        password: ""
      })
      
      const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name]: value}))
      }

      const onLogin = async (event) => {
        event.preventDefault();
        try {
            const response =  await axios.post(`${url}/api/admin/login`, data);
            if(response.data.success){
                localStorage.setItem('adminToken', response.data.token);
                navigate('/add')
            }else{
                toast.error(response.data.message);
                setError(response.data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error("An error Occurred")
        }
      }

  return (
    <div className='login-popup'>
    <form onSubmit={onLogin} className="login-popup-container">
      <div className="login-popup-title">
          <h2>Login</h2>
      </div>

      <div className="login-popup-inputs">
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
      </div>

      <button type='submit'>Login</button>
      <p >{error}</p>
    </form>
  </div>
  )
}

export default Login
