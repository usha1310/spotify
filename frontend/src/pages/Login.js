import React, { useState,useContext } from 'react';
import '../css/login.css';
import { FaLock, FaUser } from "react-icons/fa";
import axios from 'axios';
import { FcGoogle } from "react-icons/fc";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate=useNavigate();
    const { loginUser } = useContext(AuthContext); // Get loginUser from context
    
   
        const handleSubmit = async (e) => {
        e.preventDefault();
            try {
              const response = await axios.post("http://localhost:8003/login", { email:username, password });
              console.log(response.data);
              if(response.data.status==='success')
              {
                loginUser(response.data.data);
                navigate('/')
              }
                
            } catch (error) {
              console.error(error.response?.data?.message || 'An error occurred');
            }
          };
        
    

    return (
        <div className='wrapper ' >

            <img className='spotify-logo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh0LG2D3wccR5muqgi16cvnvX9IigghVE6eQ&s'></img>
            <h4>Log in to Spotify</h4>
            <div className='buttons-container'>
                
    
                <button  className='button1'>
                    <div className='fb'><GoogleIcon/></div>
                    <div className='text'>Continue with Google</div>
                    </button>
                    
                <button className='button2 justify-content:evenly'>
                  <div className='fb'><FacebookIcon/>
                  </div>  
                    <div className='text'>Continue with Facebook</div>
                    </button>
                <button className='button3'>
                    <div className='fb'>
                        <AppleIcon/>
                        </div>
                       <div className='text'> Continue with Apple</div></button>
                <button className='button4'>Continue with Phone number</button>
            
            </div>

            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className='input-box'>
                    <input
                        type='text'
                        placeholder='Email or Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <FaUser className='icon' />
                </div>

                <div className='input-box'>
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <FaLock className='icon' />
                </div>

                <div className='remember-me'>
                    <label><input type="checkbox" />Remember me</label>
                    <a href='#'>Forgot password</a>
                </div>

                <button type="submit" onClick={handleSubmit} className="login-button">Login</button>
            </form>

            <div className='register-link'>
                <p>Don't have an account? <a href='#'>Register</a></p>
            </div>
        </div>
    );
}

export default Login;