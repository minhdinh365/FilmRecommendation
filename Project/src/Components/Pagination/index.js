import React from 'react'
import propTypes from 'prop-types'

Pagination.propTypes ={
  pagination: propTypes.object.isRequired,
  onPageChange: propTypes.func,
}
Pagination.defaultProps ={
onPageChange: null,
}
function Pagination(props){
  const {pagination, onPageChange} = props;

  const {page, results, total_pages, total_results} = pagination;

  function handleOnPageChange(newPage){
    if(onPageChange){
      onPageChange(newPage)
    }
  }
    return(
      <div style ={{ display: 'flex', justifyContent: 'center'}}>
        <a className="smoothscroll" href="#portfolio">
          <button disabled= {page <= 1 } onClick ={() => handleOnPageChange(page - 1) } style ={{margin: '20px'}}>
            Prev
          </button>
        </a>
        <p style ={{alignItems: 'center', display: 'flex'}}>Trang ... {page}</p>
        <a className="smoothscroll" href="#portfolio">
          <button disabled= {page >= total_pages} onClick ={() => handleOnPageChange(page + 1 )} style ={{margin: '20px'}}>
            Next
          </button>
        </a>              
      </div>
    )
}
export default Pagination;