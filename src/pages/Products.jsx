import { Filters, ProductsContainer, PaginationContainer } from "../components";
import { customFetch } from "../utils";

const url = "/products";
const allProductsQuery = (queryParams) => {
  const { search, category, company, sort, price, shipping, page } =
    queryParams;
  return {
    queryKey: [
      "products",
      search ?? "",
      category ?? "all",
      company ?? "all",
      sort ?? "a-z",
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () => customFetch(url, { params: queryParams }),
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    //   new URL(request.url):
    // 使用 URL 对象解析 request.url，它表示当前请求的完整 URL（包括路径和查询参数）。
    // searchParams:
    // URL 对象的 searchParams 属性是一个 URLSearchParams 对象，表示 URL 中的查询字符串部分（即 ?key=value 的部分）。
    // searchParams.entries():
    // entries() 返回一个可迭代的键值对列表，包含所有的查询参数。例如，对于 URL https://example.com/page?name=john&age=30，entries() 将返回键值对 [['name', 'john'], ['age', '30']]。
    // Object.fromEntries():
    // Object.fromEntries() 将键值对数组转换为一个普通的 JavaScript 对象。例如，[['name', 'john'], ['age', '30']] 会被转换为：{name:'john',age:"30"}

    const params = Object.fromEntries(
      ...[new URL(request.url).searchParams.entries()]
    );
    const response = await queryClient.ensureQueryData(
      allProductsQuery(params)
    );
    const products = response.data.data;
    const meta = response.data.meta;

    // console.log(params);

    return { products, meta, params };
  };

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};

export default Products;
