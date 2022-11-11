import React, { useEffect, useState } from 'react';
import Container from '../components/container/container.component';
import { IoSearch } from "react-icons/io5";
import axios from 'axios';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [selectCateg, setSelectCateg] = useState(false);
  const [selectCategIndex, setSelectCategIndex] = useState(0);
  const [checkIdxCateg, setCheckIdxCateg] = useState(0);
  const [search, setSearch] = useState('');
  const [value, onChange] = useState(20000);
  const [productFilter, setProductFilter] = useState([]);

  useEffect(() => {
    const fetchproducts = async () => {
      const { data } = await axios.get('/api/product/list');
      setProducts(data);
      setProductFilter(data);
    };
    fetchproducts();
  }, []);

  let Category = [
    { name: 'Celulares' },
    { name: 'Fones de ouvido' },
  ];

  const filterSearchName = (products) => {
    const lowerSearch = search.toLowerCase();
    console.log(lowerSearch);
    return products.filter((product) => product.name.toLowerCase().includes(lowerSearch));
  };

  useEffect(() => {
    let result = productFilter;
    result = filterSearchName(products);
    setProductFilter(result);
    console.log(products);
  }, [search]);

  const handleClickCateg = (index) => {
    checkIdxCateg === index && selectCateg === true ? setSelectCateg(false) : setSelectCateg(true);
    setCheckIdxCateg(index);
    setSelectCategIndex(index);
    // console.log(Category[index].name);
  };

  return (
    <Container>
      <h2 className='filter-desc'>Filtros</h2>
      <div className='div-products'>
        <div className='div-filters'>
          <div className='box-product'>
            <h1 className='font-filters'>Preço</h1>
            <div className='price-value'>
              R$ {value}
            </div>
            <input className='input-range'
              type='range'
              id='range'
              min='0'
              max='20000'
              value={value}
              onChange={({ target: { value: radius } }) => {
                onChange(radius);
              }}
            />
            <hr className='skyline'></hr>
            <h1 className='font-filters'>Categoria</h1>
            <ul>
              {
                Category.map((category, index) => (
                  <li className='font-filters-items pointer-pass'>
                    <h1 key={index} onClick={(e) => handleClickCateg(index)}
                      className={`${selectCateg && index === selectCategIndex ? 'select' : ''}`}
                    >
                      {category.name}
                    </h1>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        <div>
          <div className='container-product-list'>
            <div className='div-input-filter'>
              <input
                className='input-filter'
                type='text'
                value={search}
                placeholder='Buscar produto'
                onFocus={(e) => e.target.placeholder = ''}
                onBlur={(e) => e.target.placeholder = 'Buscar produto'}
                onChange={(ev) => setSearch(ev.target.value)}
              />
              <IoSearch className='icon-filter' />
            </div>
            <ul className='ul-products'>
              {
                productFilter.map((product) => (
                  <li className='li-products'>
                    <div>
                      <div className='div-img-prod'>
                        <img className='img-prod' src={`/api/product/smallimage/${product._id}`} />
                      </div>
                      <hr className='skyline'></hr>
                      <h1 className='prod-desc' href={product.name}>
                        {product.name}
                      </h1>
                      <h1 className='prod-desc' href={product.price}>
                        {product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                      </h1>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Shop;
