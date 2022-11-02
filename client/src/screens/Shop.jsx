import React from 'react';
import Container from '../components/container/container.component';

let Price = [
  { name: '0-500' },
  { name: '500-1000' },
  { name: '1000-1500' },
  { name: '1500-3000' },
  { name: 'Todos' },
];

let Category = [
  { name: '0-500' },
  { name: '500-1000' },
  { name: '1000-1500' },
  { name: '1500-3000' },
];

let Products = [
  { name: 'android' },
  { name: 'iphone' },
  { name: 'iphone' },
  { name: 'iphone' },
  { name: 'iphone' },
];

const Shop = () => {
  return (
    <Container>
      <h2 className='filter-desc'>Filtros</h2>
      <div className='div-products'>
        <div className='div-filters'>
          <h1>Preço</h1>
          <ul>
            {
              Price.map((price) => (
                <li key={price.name} className=''>
                  <h1 href={price.name}>{price.name}</h1>
                </li>
              ))
            }
          </ul>
          <hr></hr>
          <h1>Categoria</h1>
          <ul>
            {
              Category.map((category) => (
                <li key={category.name} className=''>
                  <h1 href={category.name}>{category.name}</h1>
                </li>
              ))
            }
          </ul>
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
