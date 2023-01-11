import React from 'react';
import Container from '../Container';
import { IoSearch } from "react-icons/io5";

interface Props {
  handleSearch: Function,
  search: string
}

const SearchBar: React.FC<Props> = ({
    handleSearch,
    search
  }) => {
  return (
    <Container>
      <input
        className='input-filter'
        type='text'
        value={search}
        placeholder='Buscar produto'
        onFocus={(e) => e.target.placeholder = search === undefined ? '' : search}
        onBlur={(e) => e.target.placeholder = 'Buscar produto'}
        onChange={(ev) => handleSearch(ev.target.value)}
      />
      <IoSearch className='icon-filter' />
    </Container>
  );
}

export default SearchBar;
