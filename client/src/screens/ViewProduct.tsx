import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { Product } from '../types/Product';
import Container from '../components/Container';
import useApi from '../hooks/useApi';

const ViewProduct = () => {

  const { id } = useParams();
  const [product, setProduct] = useState<Product | undefined>();
  const urlImage = '/api/product/image/';
  let formatPrice: string | undefined;
  let name: string | undefined;

  useEffect(() => {
    const fetchproduct = async () => {
      const { data } = await useApi.get(`product/${id}`);
      setProduct(data);
    };
    fetchproduct();
  }, []);

  if (product != undefined) {
    name = product.name;
    formatPrice = product.price ? product.price.toLocaleString(
      'pt-br', { style: 'currency', currency: 'BRL' }
    ) : (
      ''
    );
  }

  return (
    <Container>
      <div>
        <div className='vw-prod-box'>
          <img className='vw-prod-img' src={`${urlImage}${id}`} />
        </div>
        <hr className='skyline'></hr>
        <h1 className='prod-desc' >
          {name}
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
