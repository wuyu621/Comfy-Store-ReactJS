import { formatPrice, generateAmountOption } from "../utils";
import { removeItem, editItem } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { cartId, image, title, company, price, productColor, amount } =
    cartItem;

  const removeItemFromCart = () => {
    dispatch(removeItem({ cartId }));
  };

  const handleAmount = (e) => {
    dispatch(editItem({ cartId, amount: parseInt(e.target.value) }));
  };

  return (
    <article
      key={cartId}
      className=" mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 last:border-b-0 pb-6"
    >
      {/* IMAGE */}
      <img
        src={image}
        alt={title}
        className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
      ></img>
      {/* INFO */}
      <div className="sm:ml-16 sm:w-48">
        {/*TITLE*/}
        <p className="capitalize font-medium">{title}</p>
        {/*COMPANY*/}
        <h4 className="capitalize text-md text-neutral-content">{company}</h4>
        {/*COLOR*/}
        <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
          color:
          <span
            className="badge badge-sm"
            style={{ backgroundColor: productColor }}
          ></span>
        </p>
      </div>
      {/* AMOUNT AND REMOVE */}
      <div>
        {/* AMOUNT */}
        <div className="form-control mx-w-xs">
          <label htmlFor="amount" className="capitalize label p-0">
            <span className="label-text">amount</span>
          </label>
          <select
            name="amount"
            id="amount"
            value={amount}
            onChange={handleAmount}
            className="mt-2 select select-base select-bordered select-xs"
          >
            {generateAmountOption(amount + 5)}
          </select>
        </div>
        {/* REMOVE */}
        <button
          className="mt-2 link link-primary link-hover text-sm"
          onClick={removeItemFromCart}
        >
          remove
        </button>
      </div>
      {/* PRICE */}
      <p className="font-medium sm:ml-auto">{formatPrice(price)}</p>
    </article>
  );
};

export default CartItem;
