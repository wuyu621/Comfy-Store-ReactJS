import { useSelector } from "react-redux";
import { formatPrice } from "../utils";

const CartTotals = () => {
  const { cartTotal, shipping, tax, orderTotal } = useSelector(
    (state) => state.cartState
  );
  // console.log(cartTotal);

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        {/* SUBTOTAL */}
        <p className="flex justify-between text-xs pb-2 border-b border-base-300">
          <span className="capitalize">subtotal</span>
          <span className="font-medium">{formatPrice(cartTotal)}</span>
        </p>
        {/* Shipping */}
        <p className="flex justify-between text-xs pb-2 border-b border-base-300">
          <span className="capitalize">shipping</span>
          <span className="font-medium">{formatPrice(shipping)}</span>
        </p>
        {/* Tax */}
        <p className="flex justify-between text-xs pb-2 border-b border-base-300">
          <span className="capitalize">tax</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </p>
        {/* Order Total */}
        <p className="flex justify-between text-s pb-2">
          <span className="capitalize">order total</span>
          <span className="font-medium">{formatPrice(orderTotal)}</span>
        </p>
      </div>
    </div>
  );
};

export default CartTotals;
