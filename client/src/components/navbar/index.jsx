import React, { useState } from 'react';
import NavButton from '../Buttons/NavButton';
import { Link } from 'react-router-dom';
import Container from '../Container';
import { IoMenu, IoClose, IoCartOutline } from "react-icons/io5";

const Navbar = () => {

  let Links = [
    { name: 'Home', link: '/' },
    { name: 'Produtos', link: '/shop' },
    { name: 'Registrar', link: '/' },
    { name: 'Contato', link: '/' },
  ];

  let [open, setOpen] = useState(false);

  return (
    <Container>
      <nav className='navbar'>
        <div className='div-container'>
          {/* Left Side */}
          <div className=''>
            <Link to='/' className=''>
              <img src={require('../../assets/logoT.png')} alt='Main Logo' className='logo' />
            </Link>
          </div>
          {/* <div onClick={() => setOpen(!open)} className='div-menu'>
            {open ? <IoClose /> : <IoMenu />}
          </div> */}
          {/* Right Side */}
          <ul className={`right-side ${open ? '' : ''} `}>
            {
              Links.map((link) => (
                <li key={link.name} className='ul-menu-items'>
                  <a href={link.link} className='list-items'>{link.name}</a>
                </li>
              ))
            }
            <IoCartOutline className='shopping-cart' />
            <NavButton>
              Login
            </NavButton>
          </ul>
        </div>
      </nav>
    </Container>
  );
}

export default Navbar;
