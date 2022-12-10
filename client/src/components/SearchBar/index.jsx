import React, { useState } from 'react';
import Container from '../Container';
import { IoSearch } from "react-icons/io5";

const SearchBar = (props) => {
  const [search] = ('');

  return (
    <Container>
      <input
        className='input-filter'
        type='text'
        value={search}
        placeholder='Buscar produto'
        onFocus={(e) => e.target.placeholder = ''}
        onBlur={(e) => e.target.placeholder = 'Buscar produto'}
        onChange={(ev) => props.handleSearch(ev.target.value)}
      />
      <IoSearch className='icon-filter' />
    </Container>
  );
}

export default SearchBar;
