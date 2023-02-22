import React, { useState, useEffect, useCallback } from 'react';

const Products = () => {
  const limit = 10;
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);

  const getProducts = useCallback( async (keyword) => {
    setLoading(true);
    const paramKeyword = `/search?q=${keyword}`;
    const paramSkip = (page*limit)-limit;
    const params = keyword ? paramKeyword : `?limit=${limit}&skip=${paramSkip}`;
    await fetch(`https://dummyjson.com/products${params}`)
      .then(response => response.json())
      .then(data => {
        setPages(!keyword ? Math.ceil(data.total/limit) : 0);
        setList(data.products);
        setLoading(false);
      });
  }, [page]);

  const searchList = () => {
    getProducts(search);
  };

  const pagination = (numb) => {
    const pageList = []
    if (numb > 1) {
      for(let i=1;i<=numb;i++) {
        pageList.push(
          <button
            key={i}
            type="button"
            onClick={() => setPage(i)}
            style={{ fontWeight: page === i ? 'bold': '' }}
          >
            {i}
          </button>
        );
      }
    }
    return pageList;
  }

  useEffect(() => {
    const controller = new AbortController();
    getProducts();
    return () => {
      controller.abort();
    }
  }, [getProducts]);

  return (
    <div style={{ padding: '10px' }}>
      <h3>Fetching dengan API</h3>
      <div style={{ marginBottom: '10px', display: 'flex', columnGap: '10px' }}>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type="button" onClick={() => searchList()}>cari</button>
        <div style={{ display: 'flex', columnGap: '5px' }}>
          {pagination(pages)}
        </div>
      </div>
      {loading ? 'loading ...' : ''}
      {!loading && list.map((item, idx) => (
        <div key={idx} style={{ border: 'solid 1px #ddd', padding: '10px', marginBottom: '15px' }}>
          <h4>{item.title}</h4>
          <p>{item.description}</p>
          <span>Brand: {item.brand}</span>
        </div>
      ))}
    </div>
  );
};

export default Products;
