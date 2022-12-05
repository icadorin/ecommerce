import React, { useEffect, useState } from 'react';
import Container from '../components/Container';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

const ViewProduct = () => {

  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const urlImage = '/api/product/image/';

  useEffect(() => {
    const fetchproduct = async () => {
      const { data } = await axios.get(`/api/product/${id}`);
      setProduct(data);
    };
    fetchproduct();
  }, []);

  const formatPrice = product.price ?
    product.price.
      toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : '';

  return (
    <Container>
      <div>
        <div className='vw-prod-box'>
          <img className='vw-prod-img' src={`${urlImage}${id}`} />
        </div>
        <hr className='skyline'></hr>
        <h1 className='prod-desc' >
          {product.name}
        </h1>
        <h1 className='prod-desc'>
          {formatPrice}
        </h1>
      </div>
      <div className='cn'>
        <Link to={`/payment/${id}`} className='buy-button'>
          Comprar
        </Link>
      </div>
    </Container>
  );
}

export default ViewProduct;
