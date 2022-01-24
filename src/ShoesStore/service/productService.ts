const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getProducts = async (category: string) => {
  const response = await fetch(baseUrl + "products?category=" + category);
  if (response.ok) return response.json();
  throw response;
};

const getProduct = async (id: number) => {
  const response = await fetch(baseUrl + "products/" + id);
  if (response.ok) return response.json();
  throw response;
};

const ProductService = {
  getProducts,
  getProduct,
};

export default ProductService;
