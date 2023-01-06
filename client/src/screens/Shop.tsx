import React, { useEffect, useState } from 'react';
import Container from '../components/Container';
import Slider from '../components/Slider';
import useApi from '../hooks/useApi';
import SearchBar from '../components/SearchBar';
import ListProducts from '../components/ListProducts';
import Categories from '../components/Categories';
import Button from '../components/Buttons/Button';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([] as any[]);
  const [selectCateg, setSelectCateg] = useState(false);
  const [selectCategIndex, setSelectCategIndex] = useState(0);
  const [checkIdxCateg, setCheckIdxCateg] = useState(0);
  const [search, setSearch] = useState('');
  const [price, setPrice] = useState(15000);
  const [productFilter, setProductFilter] = useState([]);
  const [catIndex, setCatIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await useApi.get('product/list');
      setProducts(data);
      setProductFilter(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await useApi.get('category/all');
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const filterPrice = (products: any) => {
    return products.filter((product: any) => product.price <= price);
  };

  const filterName = (products: any) => {
    const lowerSearch = search.toLowerCase();
    return products.filter((product: any) => product.name.toLowerCase().includes(lowerSearch));
  };

  const filterCateg = (products: any) => {
    if (checkIdxCateg === catIndex && selectCateg === false) {
      return products;
    }
    return products.filter((products: any) => products.category.name === categories[checkIdxCateg].name);
  };

  useEffect(() => {
    let result : any = products;
    result = filterName(result);
    result = filterPrice(result);
    result = filterCateg(result);
    setProductFilter(result);
  }, [search, price, checkIdxCateg, selectCateg]);

  const handleClickCateg = (index: number) => {
    setCatIndex(index);
    checkIdxCateg === index && selectCateg === true ? setSelectCateg(false) : setSelectCateg(true);
    setCheckIdxCateg(index);
    setSelectCategIndex(index);
  };

  const clearFilters = () => {
    setSelectCateg(false);
    setSelectCategIndex(0);
    setCheckIdxCateg(0);
    setCatIndex(0);
    setPrice(15000);
    setSearch('');
  }

  const handleChange = (event: any) => {
    setPrice(event.target.value);
  };

  const updateBar = (search: string) => {
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
              <Button
                onClick={clearFilters}
                children='Limpar'
              />
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
