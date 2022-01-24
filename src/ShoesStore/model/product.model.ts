import SkuModel from "./sku.model";

export default interface ProductModel {
  id: number;
  category: string;
  image: string;
  name: string;
  price: number;
  skus: SkuModel[];
  description: string;
}
