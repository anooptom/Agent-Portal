import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate,useLocation } from 'react-router';
import './Add.css'

const Add = () =>{
    const navigate = useNavigate();
    const Location = useLocation();

    const [formData, setFormData] = useState({
        name: '',
        date:'',
        vno:'',
        pno:'',
        amt:'',
        paid:'',
        extra:'',
        phno:'',
        co:'',
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === "vno") {
          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value.toUpperCase()
          }));
        } else {
          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
          }));
        }
      };

      const handleSubmit = (e) => {
        e.preventDefault();
    
        axios.post(' agent-portal-api.vercel.app/add', {data:formData,month : Location.state.month})
          .then(response => {
            if(response.data.message === '1'){
              navigate('/Dashboard');
            }
          })
          .catch(error => {
            console.error(error);
          });
      };



    return(
        <div >
        <div >
  
          <form className="s-form" onSubmit={handleSubmit}>
  
  
            <div className="input-group">   
              <input className='s-input' type="text" placeholder='Name' id="name" name="name" value={formData.name} onChange={handleChange}  required />
            </div>        

            <div className="input-group">
              <input className='s-input' type="number"  placeholder='Phone No.' id="phno" name="phno" value={formData.phno} onChange={handleChange} />
            </div>

            <div className="input-group">
            
              <input className='s-input' type="number"  placeholder='Date' id="date" name="date" value={formData.date} onChange={handleChange} />
            </div>

            <div className="input-group">
              <input className='s-input' type="text"  placeholder='Vehicle No. ' id="vno" name="vno" value={formData.vno} onChange={handleChange} required/>
            </div>

            <div className="input-group">
              <input className='s-input' type="text"  placeholder='Vechicle ' id="pno" name="pno" value={formData.pno} onChange={handleChange} />
            </div>

            <div className="input-group">
              <input className='s-input' type="number"  placeholder='Amount' id="amt" name="amt" value={formData.amt} onChange={handleChange} />
            </div>

            <div className="input-group">
              <input className='s-input' type="text"  placeholder='Paid By' id="paid" name="paid" value={formData.paid} onChange={handleChange} />
            </div>

            <div className="input-group">
              <input className='s-input' type="text"  placeholder='Date of Receipt' id="extra" name="extra" value={formData.extra} onChange={handleChange} />
            </div>

            <div className="input-group">
              <input className='s-input' type="text"  placeholder='C/O' id="co" name="co" value={formData.co} onChange={handleChange} />
            </div>

            <div >
       
              <button className="s-button" type="submit">
              Submit
            </button>

            </div>
          </form>
        </div>
      </div>
    );
};

export default Add;