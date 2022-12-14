import React, { useEffect, useState } from 'react';
import Container from '../components/Container';
import Slider from '../components/Slider';
import eccomerceFetch from '../axios/config';
import SearchBar from '../components/SearchBar';
import ListProducts from '../components/ListProducts';
import Categories from '../components/Categories';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectCateg, setSelectCateg] = useState(false);
  const [selectCategIndex, setSelectCategIndex] = useState(0);
  const [checkIdxCateg, setCheckIdxCateg] = useState(0);
  const [search, setSearch] = useState('');
  const [price, setPrice] = useState(15000);
  const [productFilter, setProductFilter] = useState([]);
  const [catIndex, setCatIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await eccomerceFetch.get('product/list');
      setProducts(data);
      setProductFilter(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await eccomerceFetch.get('category/all');
      setCategories(data);
    };
    fetchCategories();
  }, []);

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
    return products.filter((products) => products.category.name === categories[checkIdxCateg].name);
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

  const clearFilter = () => {
    setSelectCateg(false);
    setSelectCategIndex(0);
    setCheckIdxCateg(0);
    setCatIndex(0);
    setPrice(15000);
    setSearch('');
  }

  const handleChange = (event) => {
    setPrice(event.target.value);
  };

  const updateBar = (search) => {
    setSearch(search);
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
            <Categories
              handleCat={handleClickCateg}
              categories={categories}
              selectCateg={selectCateg}
              selectCategIndex={selectCategIndex}
            />
            <div className='clear'>
              <button className='clear-button' onClick={clearFilter}>
                Limpar
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className='container-product-list'>
            <div className='div-input-filter'>
              <SearchBar handleSearch={updateBar} search={search} />
            </div>
            <ListProducts productFilter={productFilter} />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Shop;
