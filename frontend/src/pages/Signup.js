/**import React, { useState } from 'react';
import '../css/Signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signup = async () => {
    try {
      const response = await axios.post("http://localhost:8003/signup", { email, password });
      console.log(response.data);
      if(response.data.status==='success')
      {
        navigate('/login')
      }
        
    } catch (error) {
      console.error(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
        
        <input
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          placeholder="Email"
          required
        />
        <input
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit" onClick={signup} className="next-button">
          Next
        </button>
        
      </form>
    </div>
  );
};

export default Signup;*/


import React, { useState } from 'react';
import '../css/Signup.css';
import facebook from '../images/facebook.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const signup = async () => {
    try {
      const response = await axios.post("http://localhost:8003/signup", { username,email, password });
      console.log(response.data);
      if(response.data.status==='success')
      {
        navigate('/login')
      }
        
    } catch (error) {
      console.error(error.response?.data?.message || 'An error occurred');
    }
  };

  
  

  return (

    
    <div className="signup-container">
      <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
      <img className='spotify-logo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh0LG2D3wccR5muqgi16cvnvX9IigghVE6eQ&s'></img>
        <h1>Sign up to start listening</h1>

     
          <>
          
      <input 
        type="text" 
        placeholder="Username" 
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        required 
      />
            <input
             onChange={(event )=>setEmail(event.target.value)}
              type="email"
              placeholder="Email"
             
              required
            />

            <input
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          placeholder="Password"
          required
        />

            <a href="a">Use phone number instead.</a>
          </>
      

        

      
          <button type="submit" onClick={signup} className="next-button" >
            Next
          </button>
      
        
        
          <div className="buttons-container">
          <button type="button" className="button1">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png" alt="Google Logo" className="button-logo" />
            Sign up with Google
          </button>
          <button type="button" className="button2">
            Sign up with facebook
          </button>
          <button type="button" className="button">
            <img src="https://i.pinimg.com/736x/1e/c1/1a/1ec11a869384bc5e59625bac39b6a099.jpg" alt="Apple Logo" className="button-logo" />
            Sign up with Apple
          </button>
       
           </div>
           <p>
      Already have an account? <a href="/login"> in here</a>.
    </p>



    <p>
      <h5>This site is protected by recaptcher and the Google </h5>
    <h6> <a href="/privacy policy">Privacy Policy and Terms of Service apply.</a></h6> 
      
    
    </p>
   
      </form>
    </div>

  );
};

export default Signup;
 