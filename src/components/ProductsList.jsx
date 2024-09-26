import { Link, useLoaderData } from "react-router-dom";
import { formatPrice } from "../utils";

const ProductsList = () => {
  const { products } = useLoaderData();
  // console.log(products);

  return (
    <div className="mt-12 grid gap-y-8">
      {products.map((product) => {
        const { id, attributes } = product;
        const { image, title, price, company } = attributes;
        const dollarAmount = formatPrice(price);
        // console.log(id, image, title, price);
        return (
          <Link
            to={`/products/${id}`}
            key={id}
            className="p-8 rounded-lg shadow-xl flex flex-col sm:flex-row gap-y-4 flex-wrap bg-base-100 hover:shadow-2xl duration-300 group"
          >
            <img
              src={image}
              slt={title}
              className="h-24 w-24 rounded-lg object-cover sm:h-32 sm:w-32 group-hover:scale-105 transition duration-300"
            />
            <div className="ml-0 sm:ml-16 ">
              <h3 className="capitalize font-medium text-lg">{title}</h3>
              <h4 className="capitalize text-md text-neutral-content">
                {company}
              </h4>
            </div>
            <p className="font-medium ml-0 sm:ml-auto text-lg">
              {dollarAmount}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsList;
