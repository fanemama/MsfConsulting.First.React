import AddressModel from "../model/address.model";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getShippingAddress = async (userId: number) => {
  return fetch(baseUrl + "shippingAddress/" + userId).then((response) => {
    if (response.ok) return response.json();
    throw response;
  });
};

const saveShippingAddress = async (address: AddressModel) => {
  return fetch(baseUrl + "shippingAddress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(address),
  });
};

const ShippingService = {
  getShippingAddress,
  saveShippingAddress,
};

export default ShippingService;
