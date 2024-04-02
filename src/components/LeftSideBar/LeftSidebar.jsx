import PropTypes from "prop-types";
const LeftSidebar = ({ setSearchData, searchData }) => {
  return (
    <div className="col-span-2 flex flex-col bg-gray-200 py-10 min-h-[100vh] items-center">
      <h1 className="text-red-500 text-3xl font-bold mb-10">Filter Users</h1>
      <input
        type="text"
        className="px-3 py-2 font-semibold placeholder-gray-500 text-black rounded-xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
        placeholder="Search User"
        aria-level="Search User"
        defaultValue={searchData}
        onMouseOut={(e) => setSearchData(e.target.value)}
        // onChange={(e) => setSearchData(e.target.value)}
      />
    </div>
  );
};
LeftSidebar.propTypes = {
  setSearchData: PropTypes.func,
  searchData: PropTypes.string,
};
export default LeftSidebar;
