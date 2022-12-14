import React from 'react';

const Categories = (props) => {
  return (
    <ul>
      {
        props.categories.map((categories, index) => (
          <li className='font-filters-items pointer-pass'>
            <h1 key={index} onClick={(e) => props.handleCat(index)}
              className={`${props.selectCateg && index === props.selectCategIndex ? 'select' : ''}`}
            >
              {categories.name}
            </h1>
          </li>
        ))
      }
    </ul>
  );
}

export default Categories;
