import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import "./Login.css"


const Login = () =>{

    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usr: '',
    pass: ''
  });

  const [alertMessage, setAlertMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(' https://agent-portal-front.vercel.app/login', formData)
      .then(response => {
        if(response.data.message === '1'){
          navigate('/Dashboard');
        }
        else if (response.data.message === '0') {
          setAlertMessage("Wrong Password!");
          setFormData({ ...formData, pass: '' });
        }
        else {
          setAlertMessage("Invalid User!");
          setFormData({ ...formData,usr: '',pass:'' });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

    return(
        <div  className="signup">
        <div className="main-signup">
        <h1>Login In</h1>
  
          <form className="su-form" onSubmit={handleSubmit}>
  
  
            <div className="input-group">   
              <input className='suu-input' type="text" placeholder='User Name' id="usr" name="usr" value={formData.usr} onChange={handleChange}  required />
            </div>        
  
  
            <div className="input-group">
              <input className='suu-input' type="password"  placeholder='Password' id="pass" name="pass" value={formData.pass} onChange={handleChange} required/>
            </div>

            <div >
            {alertMessage && <p className="alert-message">{alertMessage}</p>}
       
              <button className="su-button" type="submit">
              Log in
            </button>

            </div>
          </form>
        </div>
      </div>
    );
};

export default Login