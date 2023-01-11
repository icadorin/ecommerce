import React from 'react';

interface Props {
  handleCat: Function,
  categories: any,
  selectCateg: boolean,
  selectCategIndex: number
}

const Categories: React.FC<Props> = ({
    handleCat,
    categories,
    selectCateg,
    selectCategIndex
  }) => {
  return (
    <ul>
      {
        categories.map((categories: any, index: number) => (
          <li className='font-filters-items pointer-pass'>
            <h1 key={index} onClick={(e) => handleCat(index)}
              className={`${selectCateg && index === selectCategIndex? 'select' : ''}`}
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
