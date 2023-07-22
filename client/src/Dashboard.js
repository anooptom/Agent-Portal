import React, { useState,useEffect} from 'react';
import './Dashboard.css';
import { useNavigate,useLocation} from 'react-router';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedNav, setSelectedNav] = useState('Vehicle');
  const [selectedOption, setSelectedOption] = useState('');
  const [cli,setCli] =useState([]);
  const Location = useLocation();

  const handleNavClick = (nav) => {
    setSelectedNav(nav);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSelectedOption(value);
  };
  

  useEffect(() =>{
    const fetchclients = async () => {
      await fetch(`https://agent-portal-api.vercel.app/clients?name=${encodeURIComponent(selectedOption)}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => (res.json()))
        .then(json => {
          setCli(json);
  
        })
    };
  
    fetchclients();
  },[selectedOption]);
  
  useEffect(()=>{
    setSelectedOption(Location.state.month)
  },[Location.state])


  return (
    <div className="dashboard-container">

      <div className='nav'>
        <ul>
          <li onClick={() => handleNavClick('Vehicle')} className={selectedNav === 'Vehicle' ? 'active' : ''}>Vehicle</li>
          <li onClick={() => handleNavClick('Health')} className={selectedNav === 'Health' ? 'active' : ''}>Health</li>
          <li onClick={() => handleNavClick('Fire')} className={selectedNav === 'Fire' ? 'active' : ''}>Fire</li>
        </ul>
      </div>

      {selectedNav === 'Vehicle' && (
        <div>
          <form>
            <select className='sell' name="type" id="type" onChange={handleChange} value={selectedOption}>
              <option value="jan">January</option>
              <option value="feb">February</option>
              <option value="mar">March</option>
              <option value="apr">April</option>
              <option value="may">May</option>
              <option value="jun">June</option>
              <option value="jul">July</option>
              <option value="aug">August</option>
              <option value="sep">September</option>
              <option value="oct">October</option>
              <option value="nov">November</option>
              <option value="dec">December</option>
            </select>

            <button className='btn' onClick={() => navigate('/Add', { state: { month: selectedOption } })}>Add</button>


          </form>

          <div className='disp'>
            <hr />
            {cli.length > 0 && cli.map((data) => {
              return (
                <div>
                <Link to={{
                  pathname: "/View",
                  search:data._id
                }}>
                  <div className='item'>
                    <p>{data && data.name}</p>
                    <p className='d'>{data && data.date}</p>
                  </div>
                </Link>
                <hr />
              </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
