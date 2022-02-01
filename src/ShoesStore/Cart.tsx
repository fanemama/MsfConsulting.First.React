import CartItemModel from "./model/cartItem.model";
import ProductModel from "./model/product.model";
import useFetchAll from "./service/useFetchAll";
import ItemInCart from "./ItemInCart";
import Spinner from "./Spinner";

interface Props {
  updateQuantity: (sku: string, quantity: number) => void;
  cart: CartItemModel[];
}

const Cart = (props: Props) => {
  const urls = props.cart.map((i) => `products/${i.id}`);
  const { data: products, loading, error } = useFetchAll<ProductModel>(urls);
  const numItemsInCart = props.cart.reduce(
    (partialSum, a) => partialSum + a.quantity,
    0
  );

  const getItemInCartProps = (item: CartItemModel) => {
    return {
      product: (products || []).find((x) => (x.id = item.id)),
      itemInCart: item,
      updateQuantity: props.updateQuantity,
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
        {props.cart.map((item) => (
          <ItemInCart key={item.sku} {...getItemInCartProps(item)} />
        ))}
      </ul>
    </section>
  );
};

export default Cart;
