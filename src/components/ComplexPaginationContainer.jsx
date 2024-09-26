import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const ComplexPaginationContainer = () => {
  const { meta } = useLoaderData();
  const { page, pageCount } = meta.pagination;
  console.log(meta);

  //page 是当前页
  //pageNumber是button的数字

  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  });

  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  // console.log(search);
  // console.log(pathname);

  const handlePageChange = (pageNumber) => {
    // add page params to request
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
    // console.log(searchParams.toString());
    // console.log(pageNumber);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        className={`btn btn-xs sm:btn-md join-item ${
          activeClass && "border-base-300 bg-base-300"
        }`}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    //first button
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));

    //dots1
    if (page > 2) {
      pageButtons.push(
        <button
          className="btn btn-xs sm:btn-md join-item uppercase"
          key="dots-1"
        >
          ...
        </button>
      );
    }

    //current/active page
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }));
    }

    //dots2
    if (page < pageCount - 1) {
      pageButtons.push(
        <button
          className="btn btn-xs sm:btn-md join-item uppercase"
          key="dots-2"
        >
          ...
        </button>
      );
    }

    //last button
    pageButtons.push(
      addPageButton({ pageNumber: pageCount, activeClass: page === pageCount })
    );
    return pageButtons;
  };

  if (pageCount < 2) return null;

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item uppercase"
          onClick={() => {
            let prevPage = page - 1;
            handlePageChange(prevPage);
          }}
          disabled={page === 1}
        >
          prev
        </button>
        {renderPageButtons()}
        <button
          className="btn btn-xs sm:btn-md join-item uppercase"
          onClick={() => {
            let nextPage = page + 1;
            handlePageChange(nextPage);
          }}
          disabled={page === pageCount}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default ComplexPaginationContainer;
