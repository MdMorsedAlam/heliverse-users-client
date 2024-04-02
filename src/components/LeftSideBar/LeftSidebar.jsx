import PropTypes from "prop-types";
const LeftSidebar = ({
  setSearchData,
  setGender,
  setDomain,
  searchData,
  setAvilable,
}) => {
  return (
    <div className="col-span-2 flex flex-col bg-gray-200 py-10 min-h-[100vh] items-center">
      <h1 className="text-red-500 text-3xl font-bold mb-10">Filter Users</h1>

      <div className="px-3 flex w-full flex-col gap-3">
        <input
          type="text"
          className="p-3 w-full font-semibold placeholder-gray-500 text-black rounded-xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
          placeholder="Search By Name"
          aria-level="Search By Name"
          defaultValue={searchData}
          onMouseOut={(e) => setSearchData(e.target.value)}
        />
        <select
          className="p-3 w-full font-semibold placeholder-gray-500 text-black rounded-xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
          name="gender"
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Option</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select
          className="p-3 w-full font-semibold placeholder-gray-500 text-black rounded-xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
          name="gender"
          onChange={(e) => setDomain(e.target.value)}
        >
          <option value="">Option</option>
          <option value="Marketing">Marketing</option>
          <option value="IT">IT</option>
        </select>
        <div className="flex justify-center items-center gap-3">
          <input
            className="w-6 h-6"
            onChange={(e) =>
              setAvilable(e.target.checked === true ? "Available" : "")
            }
            type="checkbox"
            name="available"
            id="available"
          />
          <label className="text-xl font-semibold" htmlFor="available">
            Available
          </label>
        </div>
      </div>
    </div>
  );
};
LeftSidebar.propTypes = {
  setSearchData: PropTypes.func,
  setGender: PropTypes.func,
  setDomain: PropTypes.func,
  setAvilable: PropTypes.func,
  searchData: PropTypes.string,
};
export default LeftSidebar;
