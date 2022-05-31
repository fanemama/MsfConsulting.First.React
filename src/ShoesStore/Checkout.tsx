import React, { ChangeEvent, FocusEvent, FormEvent } from "react";
import AddressModel from "./model/address.model";
import { useState } from "react";
import { FormStatus } from "./enum/FormStatus.enum";
import ShippingService from "./service/shippingService";
import { useCart } from "./context/cartContext";

// interface Props {
//   cart: CartItemModel[];
//   dispatch: Dispatch<any>;
// }
const Checkout = () => {
  const [address, setAddress] = useState({} as AddressModel);
  const [status, setStatus] = useState(FormStatus.IDLE);
  const [saveError, setSaveError] = useState(null);
  const [touched, setTouched] = useState({} as any);
  const {  dispatch } =  useCart();

  const getErrors = (address: AddressModel) => {
    const result = {} as any;
    if (!address.city) result.city = "City is required";
    if (!address.country) result.country = "Country is required";
    return result;
  };

  const errors = getErrors(address);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e: ChangeEvent<any>) => {
    setAddress((curAddress) => {
      return {
        ...curAddress,
        [e.target.id]: e.target.value,
      };
    });
  };

  const handleBlur = (event: FocusEvent<any>) => {
    setTouched((cur: any) => {
      return { ...cur, [event.target.id]: true };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLElement>) => {
    event.preventDefault();
    setStatus(FormStatus.SUBMITTING);
    if (isValid) {
      try {
        await ShippingService.saveShippingAddress(address);
        dispatch({ type: "empty" });
        setStatus(FormStatus.COMPLETED);
      } catch (error: any) {
        setSaveError(error);
      }
    } else {
      setStatus(FormStatus.SUBMITTED);
    }
  };

  if (saveError) throw saveError;
  if (status === FormStatus.COMPLETED) {
    return <h1>Thanks for shopping!</h1>;
  }
  return (
    <>
      <h1>Shipping Info</h1>
      {!isValid && status === FormStatus.SUBMITTED && (
        <div role="alert">
          <p>Please correct the errors</p>
          <ul>
            {Object.keys(errors).map((x) => (
              <li key={x}>{errors[x]}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">City</label>
          <br />
          <input
            id="city"
            type="text"
            value={address.city}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <p role="alert">
            {(touched.city || status === FormStatus.SUBMITTED) &&
              errors.country}
          </p>
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <br />
          <select
            id="country"
            value={address.country}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            <option value="China">China</option>
            <option value="India">India</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="USA">USA</option>
          </select>
          <p role="alert">
            {(touched.country || status === FormStatus.SUBMITTED) &&
              errors.country}
          </p>
        </div>

        <div>
          <input
            disabled={status === FormStatus.SUBMITTING}
            type="submit"
            className="btn btn-primary"
            value="Save Shipping Info"
          />
        </div>
      </form>
    </>
  );
};

export default Checkout;
