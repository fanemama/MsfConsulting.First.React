import ProductWidget from "./ProductWidget";
import Spinner from "./Spinner";
import { useState } from "react";
import useFetch from "./service/useFetch";
import ProductModel from "./model/product.model";
import { useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";

const Products = () => {
  const [size, setSize] = useState("");
  const { category } = useParams();
  const {
    data: products,
    loading,
    error,
  } = useFetch<ProductModel[]>("products?category=" + category);
  const getfilteredProducts = () => {
    if (!products) return [] as ProductModel[];

    return size
      ? products.filter((p) => p.skus.some((s) => s.size === parseInt(size)))
      : products;
  };

  const filteredProducts = getfilteredProducts();

  if (error) throw error;
  if (loading) return <Spinner />;
  if (filteredProducts.length === 0) return <PageNotFound />;

  return (
    <>
      <section id="filters">
        <label htmlFor="size">Filter by Size:</label>{" "}
        <select
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="">All sizes</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
        {size && <h2>Found {filteredProducts.length} items</h2>}
      </section>
      <section id="products">
        {filteredProducts.map((product) => (
          <ProductWidget product={product} key={product.id} />
        ))}
      </section>
    </>
  );
};

export default Products;
