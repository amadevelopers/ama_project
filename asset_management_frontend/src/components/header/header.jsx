import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../header/header.css'
import sitLogo from '../../assets/images/sit.png'

export default function Header() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/dashboard');
    }

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