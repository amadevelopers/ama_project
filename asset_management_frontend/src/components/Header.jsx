import React, { useState,useEffect } from 'react';
import sitLogo from '../assets/images/sit.png'
import { useNavigate } from 'react-router-dom';
import './Header.css'
import axios from '../axios/axios';
export default function Header({onHeaderSearchResults}) {
  const navigate = useNavigate()
  const handleClick = async() => {
    try{
      const response = await axios.get("/Dashboard")
      const value = response.data
      
      navigate(`/dashboard`, { state: { assets: value } });

    }catch(err){
      console.log(err.message)
    }
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
      // console.log(searchTerm)
      const searchObj = {
        "query":searchTerm
      }
      const response = await axios.post("/Search",  searchObj ,{ headers: { 'Content-Type': 'application/json' }  });
      await setSearchResults(response.data);
      onHeaderSearchResults(response.data);
      onHeaderSearchResults(searchResults);
    }catch(err){
      console.log(err.message)
    }
  }

  useEffect(() => {
    // Log searchResults whenever it changes
    // console.log(searchResults);
    
  }, [searchResults]);
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
