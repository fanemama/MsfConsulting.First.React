import { Dispatch, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "./context/cartContext";
import ProductModel from "./model/product.model";
import PageNotFound from "./PageNotFound";
import useFetch from "./service/useFetch";
import Spinner from "./Spinner";

// interface Props {
//   dispatch: Dispatch<any>;
// }

const Product = () => {
  const [sku, setSku] = useState("");
  const { id } = useParams();
  const { dispatch } =  useCart();
  const navigate = useNavigate();
  const {
    data: product,
    loading,
    error,
  } = useFetch<ProductModel>(`products/${id}`);

  const addToCard = () => {
    if (id) {
      dispatch({ type: "add", id: +id, sku });
      navigate("/cart");
    }
  };

  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />;
  if (error) throw error;
  const canBedisable = sku === "";

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <select id="size" value={sku} onChange={(e) => setSku(e.target.value)}>
        <option value="">What size?</option>
        {product.skus.map((sku) => (
          <option key={sku.sku} value={sku.sku}>
            {sku.size}
          </option>
        ))}
      </select>
      <p>
        <button
          className="btn btn-primary"
          onClick={() => addToCard()}
          disabled={canBedisable}
        >
          Add to cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
};

export default Product;
