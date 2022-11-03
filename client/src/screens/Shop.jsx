import React, { useState } from 'react';
import Container from '../components/container/container.component';

let Price = [
  { name: '0-500' },
  { name: '500-1000' },
  { name: '1000-1500' },
  { name: '1500-3000' },
  { name: 'Todos' },
];

let Category = [
  { name: 'Celulares' },
  { name: 'Fones de ouvido' },
];

let Products = [
  { name: 'iphone' },
  { name: 'iphone' },
  { name: 'iphone' },
  { name: 'iphone' },
  { name: 'iphone' },
];

const Shop = () => {
  let [select, setSelect] = useState(false);

  return (
    <Container>
      <h2 className='filter-desc'>Filtros</h2>
      <div className='div-products'>
        <div className='div-filters'>
          <div className='box-product'>
            <h1 className='font-filters'>Preço</h1>
            <ul>
              {
                Price.map((price) => (
                  <li key={price.name} className='font-filters-items pointer-pass'>
                    <h1 id='selecPrice' onClick={() => setSelect(!select)} className={`${select && price.name == 'Todos' ? 'select' : ''}`}
                      href={price.name}
                    >
                      {price.name}
                    </h1>
                  </li>
                ))
              }
            </ul>
            <hr className='skyline'></hr>
            <h1 className='font-filters'>Categoria</h1>
            <ul>
              {
                Category.map((category) => (
                  <li key={category.name} className='font-filters-items pointer-pass'>
                    <h1 href={category.name}>{category.name}</h1>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        <div id='container'>
          <ul className='ul-products'>
            {
              Products.map((products) => (
                <li key={products.name} className='li-products'>
                  <h1 href={products.name}>{products.name}</h1>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </Container>
  );
}

export default Shop;
