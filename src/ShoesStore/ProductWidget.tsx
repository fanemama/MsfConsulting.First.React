import { Link } from "react-router-dom";
import ProductModel from "./model/product.model";

interface Props {
  product: ProductModel;
}

const ProductWidget = (props: Props) => {
  return (
    <div key={props.product.id} className="product">
      <Link to={`/${props.product.category}/${props.product.id}`}>
        <img src={`/images/${props.product.image}`} alt={props.product.name} />
        <h3>{props.product.name}</h3>
        <p>${props.product.price}</p>
      </Link>
    </div>
  );
};

export default ProductWidget;
