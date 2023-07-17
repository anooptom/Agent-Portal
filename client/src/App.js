import React from 'react';
import { Route, Routes} from 'react-router';
import Login from './Login'
import Dashboard from './Dashboard';
import Add from './Add';
import View from './View';
import Edit from './Edit';

function App() {
  return (
    <div className="App">
     <Routes>
        <Route path='/' element={<Login />} /> 
        <Route path='/Dashboard' element={<Dashboard/>} />
        <Route path='/Add' element={<Add/>} />
        <Route path='/View' element={<View/>} />
        <Route path='/Edit' element={<Edit/>} />
      </Routes>
    </div>
  );
}

export default App;
