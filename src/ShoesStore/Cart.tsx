import CartItemModel from "./model/cartItem.model";
import ProductModel from "./model/product.model";
import useFetchAll from "./service/useFetchAll";
import ItemInCart from "./ItemInCart";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useCart } from "./context/cartContext";

// interface Props {
//   dispatch: Dispatch<any>;
//   cart: CartItemModel[];
// }

const Cart = () => {
  const { cart, dispatch } =  useCart();
  const urls = cart.map((i) => `products/${i.id}`);
  const { data: products, loading, error } = useFetchAll<ProductModel>(urls);
 
  
  const navigate = useNavigate();
  const numItemsInCart = cart.reduce(
    (partialSum, a) => partialSum + a.quantity,
    0
  );

  const getItemInCartProps = (item: CartItemModel) => {
    return {
      product: (products || []).find((x) => (x.id = item.id)),
      itemInCart: item,
      dispatch: dispatch,
    };
  };

  if (loading) return <Spinner />;
  if (error) throw error;

  return (
    <section id="cart">
      <h1>
        {numItemsInCart === 0
          ? "Your cart is empty"
          : `${numItemsInCart} Item${numItemsInCart > 1 ? "s" : ""} in My Cart`}
      </h1>
      <ul>
        {cart.map((item) => (
          <ItemInCart key={item.sku} {...getItemInCartProps(item)} />
        ))}
      </ul>
      {numItemsInCart > 0 && (
        <button
          className="btn btn-primary"
          onClick={() => navigate("/checkout")}
        >
          CheckOut
        </button>
      )}
    </section>
  );
};

export default Cart;
