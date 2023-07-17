import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Add.css';

const Edit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [det, setDet] = useState({});

  useEffect(() => {
    setDet({
      id: location.state.id,
      name: location.state.name,
      vno: location.state.vno,
      pno: location.state.pno,
      extra: location.state.extra,
      co: location.state.co,
      date: location.state.date,
      phno: location.state.phno,
      amt: location.state.amt,
      paid: location.state.paid
    });
  }, [location.state]);

  const handleChange = (e) => {
    setDet({
      ...det,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://agent-portal-api.vercel.app/editt', { data: det});
      navigate('/Dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {Object.keys(det).length > 0 && (
        <div key={det.id}>
          <form className="s-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                className="s-input"
                type="text"
                placeholder="Name"
                id="name"
                name="name"
                value={det.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                className="s-input"
                type="number"
                placeholder="Phone No."
                id="phno"
                name="phno"
                value={det.phno}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <input
                className="s-input"
                type="number"
                placeholder="Date"
                id="date"
                name="date"
                value={det.date}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <input
                className="s-input"
                type="text"
                placeholder="Vehicle No."
                id="vno"
                name="vno"
                value={det.vno}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                className="s-input"
                type="text"
                placeholder="Vehicle"
                id="pno"
                name="pno"
                value={det.pno}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <input
                className="s-input"
                type="number"
                placeholder="Amount"
                id="amt"
                name="amt"
                value={det.amt}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <input
                className="s-input"
                type="text"
                placeholder="Paid By"
                id="paid"
                name="paid"
                value={det.paid}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <input
                className="s-input"
                type="text"
                placeholder="Date of Receipt"
                id="extra"
                name="extra"
                value={det.extra}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <input
                className="s-input"
                type="text"
                placeholder="C/O"
                id="co"
                name="co"
                value={det.co}
                onChange={handleChange}
              />
            </div>

            <div>
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Edit;
