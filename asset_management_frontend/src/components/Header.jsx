import React, { useState } from 'react';
import sitLogo from '../assets/images/sit.png'
import { useNavigate } from 'react-router-dom';
import './Header.css'
import axios from 'axios';
export default function Header() {
  const navigate = useNavigate()
  const handleClick = () => {
    // Navigate to Google
    navigate("/dashboard")
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    try{
      const response = await axios.post("http://127.0.0.1:9000/inventory/Search", { searchTerm });
      setSearchResults(response.data.results);
      console.log(searchResults)
    }catch(err){
      console.log(err.message)
    }
  }
  return (
    <div>
      <header>
        <img src={sitLogo} alt="Sit" />
        <h1>Siddaganga Institute of Technology</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <button className="home-button" onClick={handleClick}>
          Home
        </button>
      </header>
    </div>
  );
}
