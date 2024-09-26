import { useLoaderData } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const OrdersList = () => {
  const { meta, orders } = useLoaderData();
  console.log(orders);

  return (
    <div className="mt-4">
      <h4 className="capitalize mb-4">
        total orders : {meta.pagination.total}
      </h4>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/*head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Products</th>
              <th>Cost</th>
              <th className="hidden sm:block">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const { name, address, numItemsInCart, orderTotal, createdAt } =
                order.attributes;
              const date = day(createdAt).format("MMM Do, YYYY");
              return (
                <tr key={order.id}>
                  <th className="font-normal">{name}</th>
                  <th className="font-normal">{address}</th>
                  <th className="font-normal">{numItemsInCart}</th>
                  <th className="font-normal">{orderTotal}</th>
                  <th className="hidden font-normal sm:block">{date}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersList;
