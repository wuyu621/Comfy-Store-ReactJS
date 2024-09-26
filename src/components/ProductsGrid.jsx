import { Link, useLoaderData } from "react-router-dom";
import { formatPrice } from "../utils";

const ProductsGrid = () => {
  const { products } = useLoaderData();
  // console.log(products);

  return (
    <div className="pt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const { id, attributes } = product;
        const { image, title, price } = attributes;
        const dollarAmount = formatPrice(price);
        // console.log(id, image, title, price);
        return (
          <Link
            to={`/products/${id}`}
            key={id}
            className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
          >
            <figure className="px-4 pt-4">
              <img
                src={image}
                slt={title}
                className="rounded-xl object-cover h-64 w-full"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{title}</h2>
              <p className="text-secondary">{dollarAmount}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
