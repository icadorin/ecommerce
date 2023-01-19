import React from 'react';
import { Link } from "react-router-dom";

interface Props {
  productFilter: any
}

const ListProducts: React.FC<Props> = ({
  productFilter
}) => {
  return (
    <ul className='ul-products'>
      {productFilter.length === 0 ?
        (<h1 className='prod-not-found'>Produto não encontrado :(</h1>
        ) : (
          productFilter.map((product: any) => (
            <Link to={`/viewproduct/${product._id}`}>
              <li className='li-products'>
                <div>
                  <div className='div-img-prod'>
                    <img className='img-prod' src={`/api/product/smallimage/${product._id}`} />
                  </div>
                  <hr className='skyline'></hr>
                  <h1 className='prod-desc'>
                    {product.name}
                  </h1>
                  <h1 className='prod-desc'>
                    {product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                  </h1>
                </div>
              </li>
            </Link>
          ))
        )
      }
    </ul>
  );
}

export default ListProducts;
