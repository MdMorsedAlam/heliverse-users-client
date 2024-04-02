import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Paginations from "../../components/Pagination/Pagination";
import Loading from "../Loading/Loading";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import LeftSidebar from "../../components/LeftSideBar/LeftSidebar";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/features/teams/teamSlice";
const Home = () => {
  const axiosPublic = useAxiosPublic();
  const [count, setCount] = useState(null);
  const [searchData, setSearchData] = useState("");
  const usersPerPage = 20;
  const numOfPages = Math.ceil(count / usersPerPage);
  const pages = [...Array(numOfPages).keys()];
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const { teamUsers } = useSelector((state) => state.teamSlice);
  const [gender, setGender] = useState("");
  const [domain, setDomain] = useState("");
  const [available, setAvilable] = useState("");
  useEffect(() => {
    axiosPublic
      .get("/count-users")
      .then((res) => {
        setCount(res.data.count);
      })
      .catch();
  }, [axiosPublic]);

  let { isLoading, data: allUsers } = useQuery({
    queryKey: [currentPage, usersPerPage, searchData],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `all-users?page=${currentPage}&limit=${usersPerPage}&search=${searchData}`
      );
      return res.data;
    },
  });
  console.log(allUsers);
  console.log(available);
  if (gender && !domain && !available) {
    allUsers = allUsers.filter((user) => user.gender === gender);
  }
  if (gender && domain && !available) {
    allUsers = allUsers.filter(
      (user) => user.gender === gender && user.domain === domain
    );
  }
  if (gender && domain && available) {
    allUsers = allUsers.filter(
      (user) =>
        user.gender === gender &&
        user.domain === domain &&
        user.available === true
    );
  }
  if (!gender && domain && !available) {
    allUsers = allUsers.filter((user) => user.domain === domain);
  }

  if (available) {
    allUsers = allUsers.filter((user) => user.available === true);
  }

  const handelCreateTeam = (item) => {
    const checkDubplicate = teamUsers.find(
      (user) => user.domain === item.domain
    );
    if (checkDubplicate) {
      alert("Please try new");
    } else {
      const id = item._id;
      const name = item.first_name + " " + item.last_name;
      const domain = item.domain;

      const userData = { id, domain, name };
      dispatch(addUser(userData));
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="grid grid-cols-8 container mx-auto">
      <LeftSidebar
        setGender={setGender}
        setSearchData={setSearchData}
        searchData={searchData}
        setDomain={setDomain}
        setAvilable={setAvilable}
      />
      <div className="border col-span-4 py-5 px-3">
      <h1 className="text-red-500 text-3xl text-center font-bold mb-10">All Users</h1>
        <div className="grid grid-cols-2 gap-4">
          {allUsers?.map((item) => (
            <div className="bg-stone-200 shadow-xl rounded-lg" key={item._id}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={item.avatar}
                    alt={item.avatar}
                  />
                  <div className="flex text-xl font-bold gap-2">
                    <h1>{item.first_name}</h1>
                    <h1>{item.last_name}</h1>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => handelCreateTeam(item)}
                    className="px-2 font-bold text-white py-1 bg-blue-400 rounded-md mr-2"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="pl-16 pb-3">
                <h3 className="text-lg font-semibold">
                  Gender : <span className="text-gray-600">{item.gender}</span>
                </h3>
                <h3 className="text-lg font-semibold">
                  Domail : <span className="text-gray-600">{item.domain}</span>
                </h3>
                <h3 className="text-lg font-semibold">
                  Email : <span className="text-gray-600">{item.email}</span>
                </h3>
              </div>
            </div>
          ))}
        </div>
        <Paginations
          totalpages={pages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
      <RightSidebar />
    </div>
  );
};

export default Home;
