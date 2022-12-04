import React from 'react';
import Container from '../components/Container';

const ViewProduct = (props) => {

  console.log(props);
  return (
    <Container>
      <div>
        <div className='div-img-prod'>
          {/* <img className='img-prod' src={`/api/product/smallimage/${product._id}`} /> */}
        </div>
        <hr className='skyline'></hr>
        <h1 className='prod-desc' >
          {/* {product.name} */}
        </h1>
        <h1 className='prod-desc' >
          {/* {product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} */}
        </h1>
      </div>
    </Container>
  );
}

export default ViewProduct;
