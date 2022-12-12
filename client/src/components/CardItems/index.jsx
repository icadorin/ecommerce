import React from 'react';

const CardItems = ({ id, name, price }) => {
  return (
    <li className='li-products'>
      <div>
        <div className='div-img-prod'>
          <img className='img-prod' src={`/api/product/smallimage/${id}`} />
        </div>
        <hr className='skyline'></hr>
        <h1 className='prod-desc' href={name}>
          {name}
        </h1>
        <h1 className='prod-desc' href={price}>
          {price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
        </h1>
      </div>
    </li>
  );
}

export default CardItems;
