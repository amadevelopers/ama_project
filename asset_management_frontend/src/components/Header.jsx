import React from 'react';
import sitLogo from '../assets/images/sit.png'

export default function Header() {
  const handleClick = () => {
    // Navigate to Google
    window.location.href = 'https://www.google.com';
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
