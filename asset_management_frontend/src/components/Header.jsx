import React from 'react';
import sitLogo from '../assets/images/sit.png'
import { useNavigate } from 'react-router-dom';
export default function Header() {
  const navigate = useNavigate()
  const handleClick = () => {
    // Navigate to Google
    navigate("/dashboard")
  };

  return (
    <div>
      <header>
        <img src={sitLogo} alt="Sit" />
        <h1>Siddaganga Institute of Technology</h1>
        <button className="home-button" onClick={handleClick}>
          Home
        </button>
      </header>
    </div>
  );
}
