import { useEffect, useState } from "react";
import "./styles.css";

export default function BackendPagination() {
  const [products, setproducts] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  //   const totalPages = Math.ceil(products?.length / 10);

  const fetchData = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10}`
    );
    const data = await res.json();
    setproducts(data?.products);
    setTotalPages(Math.ceil(data?.total / 10));
  };
  useEffect(() => {
    fetchData();
  }, [page]);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };
  console.log(totalPages);
  return (
    <div className="App">
      <h1>Pagination Roadsidecoder</h1>
      <div className="products-list">
        {products?.length > 0 &&
          products.map(
            (item) => (
              console.log(item),
              (
                <div className="product-body" key={item.id}>
                  <img src={item.thumbnail} alt={item.title} />
                  <span>{item.title}</span>
                </div>
              )
            )
          )}
      </div>
      {products?.length > 0 && (
        <div className="pagination">
          <span onClick={() => selectPageHandler(page - 1)}>◀️</span>
          <span>
            {[...Array(totalPages)].map((_, i) => (
              <span
                className={page === i + 1 ? "pagination-selected" : ""}
                onClick={() => selectPageHandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            ))}
          </span>
          <span onClick={() => selectPageHandler(page + 1)}>▶️</span>
        </div>
      )}
    </div>
  );
}
