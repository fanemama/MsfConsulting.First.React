import CartItemModel from "./model/cartItem.model";
import ProductModel from "./model/product.model";

interface Props {
  product: ProductModel | undefined;
  updateQuantity: (sku: string, quantity: number) => void;
  itemInCart: CartItemModel;
}

const ItemInCart = (props: Props) => {
  if (!props.product) throw new Error("product not found!");
  const { price, name, image, skus } = props.product;
  const { sku, quantity } = props.itemInCart;
  const { size } = skus.find((s) => s.sku === props.itemInCart.sku) || {};

  return (
    <li className="cart-item">
      <img src={`/images/${image}`} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>${price}</p>
        <p>Size: {size}</p>
        <p>
          <select
            aria-label={`Select quantity for ${name} size ${size}`}
            onChange={(e) =>
              props.updateQuantity(sku, parseInt(e.target.value))
            }
            value={quantity}
          >
            <option value="0">Remove</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </p>
      </div>
    </li>
  );
};

export default ItemInCart;
