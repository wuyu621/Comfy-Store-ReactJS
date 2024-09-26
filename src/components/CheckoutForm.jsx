import FormInput from "./FormInput";
import { Form, redirect } from "react-router-dom";
import SubmitBtn from "./SubmitBtn";
import { customFetch, formatPrice } from "../utils";
import { clearCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import { ordersQuery } from "../pages/Orders";

export const action =
  (store, queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    // console.log(data);
    const data = Object.fromEntries(formData);

    const { name, address } = data;
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;
    const user = store.getState().userState.user;

    const info = {
      address,
      cartItems,
      chargeTotal: orderTotal,
      name,
      numItemsInCart,
      orderTotal: formatPrice(orderTotal),
    };
    // console.log(info);
    try {
      const response = await customFetch.post(
        "/orders",
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // console.log(response);

      store.dispatch(clearCart());
      toast.success("order placed successfully");
      queryClient.removeQueries(ordersQuery);
      return redirect("/orders");
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "there was an error placing your order";
      toast.error(errorMessage);
      if (error?.response?.status === 401 || 403) return redirect("/login");
      return null;
    }
  };

const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="text-xl font-medium capitalize">shipping information</h4>
      <FormInput label="first name" name="name" type="text" />
      <FormInput label="address" name="address" type="text" />
      <div className="mt-4">
        <SubmitBtn text=" place your order" />
      </div>
    </Form>
  );
};

export default CheckoutForm;
