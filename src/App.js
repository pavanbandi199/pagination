import { useEffect, useState } from "react";
import BackendPagination from "./BackendPagination";
import "./styles.css";

export default function App() {
  const [products, setproducts] = useState();
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(products?.length / 10);

  const fetchData = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    setproducts(data?.products);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products?.length / 10 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };
  return (
    <div className="App">
      <h1>Pagination Roadsidecoder</h1>
      <div className="products-list">
        {products?.length > 0 &&
          products.slice(page * 10 - 10, page * 10).map(
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
      <BackendPagination />
    </div>
  );
}
