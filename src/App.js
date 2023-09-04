import logo from './logo.svg';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthPage } from './components/AuthPage';
import { MainPage } from './components/MainPage';


function App() {
  const [phoneNumber, setPhoneNumber] = useState();
  const [username, setUsername] = useState()

  const initials = {
    'name': 'Gasyuk Aleksandr P32131',
    lesson: 'Web-programming',
    lab: 'Lab N4 Variant N1206'
  }

  const changeNumber = (number) => {
    setPhoneNumber(number);
  }

  const changeName = (name) => {
    setUsername(name);
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthPage initials={initials}
                                changeName={changeName} 
                                changeNumber={changeNumber}
        />} />
        <Route path="main" element={<MainPage phoneNumber={phoneNumber} username={username}/>} />
      </Routes>
      
    </div>
  );
}

export default App;
