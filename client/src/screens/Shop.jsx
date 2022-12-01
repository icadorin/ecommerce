import React, { useEffect, useState } from 'react';
import Container from '../components/Container';
import { IoSearch } from "react-icons/io5";
import axios from 'axios';
import Slider from '../components/Slider';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [selectCateg, setSelectCateg] = useState(false);
  const [selectCategIndex, setSelectCategIndex] = useState(0);
  const [checkIdxCateg, setCheckIdxCateg] = useState(0);
  const [search, setSearch] = useState('');
  const [price, setPrice] = useState(15000);
  const [productFilter, setProductFilter] = useState([]);
  const [catIndex, setCatIndex] = useState(0);

  useEffect(() => {
    const fetchproducts = async () => {
      const { data } = await axios.get('/api/product/list');
      setProducts(data);
      setProductFilter(data);
    };
    fetchproducts();
  }, []);

  let Category = [
    { name: 'Celular' },
    { name: 'Fones de ouvido' },
  ];

  const filterPrice = (products) => {
    return products.filter((product) => product.price <= price);
  };

  const filterSearchName = (products) => {
    const lowerSearch = search.toLowerCase();
    return products.filter((product) => product.name.toLowerCase().includes(lowerSearch));
  };

  const filterCateg = (products) => {
    if (checkIdxCateg === catIndex && selectCateg === false) {
      return products;
    }
    return products.filter((products) => products.category.name === Category[checkIdxCateg].name);
  };

  useEffect(() => {
    let result = products;
    result = filterSearchName(result);
    result = filterPrice(result);
    result = filterCateg(result);
    setProductFilter(result);
  }, [search, price, checkIdxCateg, selectCateg]);

  const handleClickCateg = (index) => {
    setCatIndex(index);
    checkIdxCateg === index && selectCateg === true ? setSelectCateg(false) : setSelectCateg(true);
    setCheckIdxCateg(index);
    setSelectCategIndex(index);
  };

  const handleChange = (event) => {
    setPrice(event.target.value);
  };

  return (
    <Container>
      <h2 className='filter-desc'>Filtros</h2>
      <div className='div-products'>
        <div className='div-filters'>
          <div className='box-product'>
            <h1 className='font-filters'>Preço</h1>
            <div className='price-value'>
              R$ {price}
            </div>
            <Slider
              value={price}
              handleChange={handleChange}
              min={0}
              max={15000}
              step={100}
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
              {productFilter.length === 0 ?
                (<h1 className='prod-not-found'>Produto não encontrado :(</h1>
                ) : (
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
                )
              }
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Shop;
