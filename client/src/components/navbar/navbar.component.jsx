import React, { useState } from 'react';
import Button from '../buttons/button';
import { Link } from 'react-router-dom';
import Container from '../container/container.component';
import { IoMenu, IoClose, IoCartOutline } from "react-icons/io5";
import './navbar.css';

const Navbar = () => {

  let Links = [
    { name: 'HOME', link: '/' },
    { name: 'PRODUTOS', link: '/' },
    { name: 'REGISTRAR', link: '/' },
    { name: 'CONTATO', link: '/' },
  ];

  let [open, setOpen] = useState(false);

  return (
    <Container>
      <nav className='navbar'>
        <div className='div-container'>
          {/* Left Side */}
          <div className='div-left-side'>
            <Link to='/' className='mr-1 pt-2'>
              <img src={require('../../assets/logoT.png')} alt='Main Logo' className='logo w-16 animateLogo' />
            </Link>
          </div>
          <div onClick={() => setOpen(!open)} className='div-menu'>
            {open ? <IoClose /> : <IoMenu />}
          </div>
          {/* Right Side */}
          <ul className={`div-right-side ${open ? 'top-20 opacity-400' : 'top-[-490px]'} md:opacity-100`}>
            {
              Links.map((link) => (
                <li key={link.name} className='ul-list-items'>
                  <a href={link.link} className='list-menu-items'>{link.name}</a>
                </li>
              ))
            }
            <IoCartOutline className='cart ul-list-items' />
            <Button>
              Login
            </Button>
          </ul>
        </div>
      </nav>
    </Container>
  );
};

export default Navbar;
