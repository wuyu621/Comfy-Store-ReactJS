import { toast } from "react-toastify";
import { SectionTitle, CheckoutForm, CartTotals } from "../components";
import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";

export const loader = (store,queryClient) => async () => {
  const user = store.getState().userState.user;
  if (!user) {
    toast.warn("You must be logged in to checkout");
    return redirect("/login");
  }
  return null;
};

const Checkout = () => {
  const cart = useSelector((state) => state.cartState.cartItems);

  if (cart.length === 0) return <SectionTitle text="your cart is empty" />;

  return (
    <>
      <SectionTitle text="place your order" />
      <div className="mt-8 gap-8 grid md:grid-cols-2">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
};

export default Checkout;
