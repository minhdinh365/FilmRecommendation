import React from "react";
import propTypes from "prop-types";

Pagination.propTypes = {
  pagination: propTypes.object.isRequired,
  onPageChange: propTypes.func,
};
Pagination.defaultProps = {
  onPageChange: null,
};
function Pagination(props) {
  const { pagination, onPageChange } = props;

  const { page, total_pages } = pagination;

  function handleOnPageChange(newPage) {
    if (onPageChange) {
      onPageChange(newPage);
    }
  }
  return (
    <div className="pagination-movie">
      <a className="smoothscroll" href="#portfolio">
        <button
          className="btn-pagination"
          disabled={page <= 1}
          onClick={() => handleOnPageChange(page - 1)}
        >
          Prev
        </button>
      </a>
      <p>Trang ... {page}</p>
      <a className="smoothscroll" href="#portfolio">
        <button
          className="btn-pagination"
          disabled={page >= total_pages}
          onClick={() => handleOnPageChange(page + 1)}
        >
          Next
        </button>
      </a>
    </div>
  );
}
export default Pagination;
