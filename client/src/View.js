import React, { useState, useEffect } from 'react';
import { useLocation ,useNavigate} from 'react-router';

const View = () => {
  const location = useLocation();
  const [det, setDet] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`http://192.168.1.8:3001/details?name=${encodeURIComponent(location.search.substring(1))}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setDet(data);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, [location.search]);

  return (
    <div>
      <div>
        {det.length > 0 && det.map((data) => {
          return (
            <div className='tab'>
                <table>
                <tr>
                    <td>Name</td>
                    <td>: {data.name}</td>
                </tr>
                
                <tr>
                    <td>Phone No. </td>
                    <td>: {data.phno}</td>
                </tr>

                <tr>
                    <td>Date</td>
                    <td>: {data.date}</td>
                </tr>
                
                <tr>
                    <td>Vehicle No</td>
                    <td>: {data.vno}</td>
                </tr>
                
                <tr>
                    <td>Vehicle</td>
                    <td>: {data.pno}</td>
                </tr>

                <tr>
                    <td>Amount</td>
                    <td>: {data.amt}</td>
                </tr>

                <tr>
                    <td>Paid By</td>
                    <td>: {data.paid}</td>
                </tr>
                
                <tr>
                    <td>Date Of Receipt</td>
                    <td>: {data.extra}</td>
                </tr>

                <tr>
                    <td>C/O</td>
                    <td>: {data.co}</td>
                </tr>

                </table>

                <button className='btn' onClick={() => navigate('/Edit', { state: { id: data._id , name:data.name , vno : data.vno , pno : data.pno , extra : data.extra , co : data.co ,date : data.date,phno : data.phno, amt:data.amt , paid:data.paid} })}>Edit</button>
             </div>

          );
        })}
      </div>
    </div>
  );
};

export default View;
