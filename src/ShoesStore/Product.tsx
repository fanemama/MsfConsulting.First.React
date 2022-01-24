import ProductModel from "./model/product.model";

interface Props {
  product: ProductModel;
}

const Product = (props: Props) => {
  return (
    <div key={props.product.id} className="product">
      <a href="/">
        <img src={`/images/${props.product.image}`} alt={props.product.name} />
        <h3>{props.product.name}</h3>
        <p>${props.product.price}</p>
      </a>
    </div>
  );
};

export default Product;
