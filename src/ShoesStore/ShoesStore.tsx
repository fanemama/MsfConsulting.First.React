import "./ShoesStore.css";
import Footer from "./Footer";
import Header from "./Header";
import Product from "./Product";
import Spinner from "./Spinner";
import { useState } from "react";
import useFetch from "./service/useFetch";
import ProductModel from "./model/product.model";

const ShoesStore = () => {
  const [size, setSize] = useState("");
  const {
    data: products,
    loading,
    error,
  } = useFetch<ProductModel[]>("products?category=shoes");
  const getfilteredProducts = () => {
    if (!products) return [] as ProductModel[];

    return size
      ? products.filter((p) => p.skus.some((s) => s.size === parseInt(size)))
      : products;
  };

  const filteredProducts = getfilteredProducts();

  if (error) throw error;
  if (loading) return <Spinner />;

  return (
    <>
      <div className="content">
        <Header />
        <main>
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
              <Product product={product} key={product.id} />
            ))}
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ShoesStore;
