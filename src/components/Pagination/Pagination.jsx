import Pagination from "@mui/material/Pagination";
import PropTypes from "prop-types";
const Paginations = ({ totalpages, setCurrentPage, currentPage }) => {
  return (
    <div className="flex mt-10 justify-center">
      <Pagination
        count={totalpages?.length}
        variant="outlined"
        shape="rounded"
        color="secondary"
        defaultPage={currentPage + 1}
        onChange={(e, value) => setCurrentPage(value - 1)}
        size="large"
        showFirstButton
        showLastButton
      />
    </div>
  );
};

Paginations.propTypes = {
  totalpages: PropTypes.array,
  setCurrentPage: PropTypes.func,
  currentPage: PropTypes.number,
};
export default Paginations;
