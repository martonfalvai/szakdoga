import React, { use } from 'react';
import styles from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navItems = [
      { name: 'Home', link: '/' },
      { name: 'About', link: '/about' },
      { name: 'Services', link: '/services' },
      { name: 'Contact', link: '/contact' }
    ];

    const navigate = useNavigate();
    
    
  };
  
  
  
  export default Navbar;