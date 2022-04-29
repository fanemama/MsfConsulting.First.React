import CartItemModel from "../model/cartItem.model";

const cartReducer = (
  state: CartItemModel[],
  action: { type: string; sku?: string; id?: number; quantity?: number }
): CartItemModel[] => {
  switch (action.type) {
    case "empty":
      return [];
    case "add":
      let item = state.find((x) => x.sku === action.sku);
      if (!item)
        return [
          ...state,
          { id: action.id ?? 0, sku: action.sku ?? "", quantity: 1 },
        ];

      const updatedItem = {
        id: item.id,
        sku: item.sku,
        quantity: item.quantity++,
      };
      return [...state.filter((x) => x.sku !== action.sku), updatedItem];
    case "updateQuantity":
      const { sku, quantity } = action;
      return quantity === 0
        ? state.filter((x) => x.sku !== sku)
        : (state.map((x) =>
            x.sku === sku ? { ...x, quantity } : x
          ) as CartItemModel[]);
    default:
      throw new Error("Unhandled action " + action.type);
  }
};

export default cartReducer;
