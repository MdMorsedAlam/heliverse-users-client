import { useDispatch, useSelector } from "react-redux";
import { cleareUsers, removeUser } from "../../redux/features/teams/teamSlice";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../pages/Loading/Loading";
import Swal from "sweetalert2";
import { useState } from "react";
import Modal from "../Modal/Modal";

const RightSidebar = () => {
  const { teamUsers } = useSelector((state) => state.teamSlice);
  const axiosPublic = useAxiosPublic();
  const [open, setOpen] = useState(false);
  const [teamData, setTeamData] = useState([]);
  const [teamLoading, setTeamLoading] = useState(true);
  const dispatch = useDispatch();

  const {
    isLoading,
    refetch,
    data: allTeams,
  } = useQuery({
    queryKey: ["all-teams"],
    queryFn: async () => {
      const res = await axiosPublic.get("all-teams");
      return res.data;
    },
  });
  const handelSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const teamName = form.teamName.value;
    const teamIds = teamUsers.map((userId) => userId.id);
    const teamData = { teamName, teamIds };
    axiosPublic
      .post("/add-team", { teamData })
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Created New ${teamName} Team`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      })
      .catch();
    form.reset();
    dispatch(cleareUsers());
  };

  const handleDeleteTeam = (id) => {
    axiosPublic
      .delete(`/delete-team/${id}`)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Deleted The Team",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const hadelOpenModal = (item) => {
    setTeamLoading(true);
    axiosPublic
      .get(`/get-team-users?id=${item._id}`)
      .then((res) => {
        setTeamData(res.data);
        setTeamLoading(false);
      })
      .catch(setTeamLoading(false));
    setOpen(!open);
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="col-span-2 flex flex-col bg-gray-200 py-10 min-h-[100vh]">
      <h1 className="text-red-500 text-3xl text-center font-bold">My Teams</h1>
      <div className="mt-10 flex px-5 flex-col gap-3">
        {allTeams.map((item) => (
          <div
            className="flex justify-between p-5 bg-slate-200 items-center rounded-lg shadow-2xl"
            key={item._id}
          >
            <button
              onClick={() => hadelOpenModal(item)}
              className="text-xl font-semibold"
            >
              {item.teamName}
            </button>
            <button
              onClick={() => handleDeleteTeam(item._id)}
              className="px-2 font-bold text-white py-1 bg-blue-400 rounded-md mr-2"
            >
              X
            </button>
          </div>
        ))}
      </div>

      <hr className="h-2 bg-red-600 w-full my-10" />
      <h1 className="text-red-500 text-3xl text-center font-bold mb-10">
        New Team
      </h1>
      {teamUsers.length > 0 ? (
        <div className="px-5">
          <div className="flex mb-10 flex-col gap-3">
            {teamUsers.map((item) => (
              <div className="flex justify-between items-center" key={item.id}>
                <h1 className="font-medium">{item.name}</h1>
                <button
                  onClick={() => dispatch(removeUser(item.id))}
                  className="px-2 font-bold text-white py-1 bg-blue-400 rounded-md mr-2"
                >
                  X
                </button>
                <h1 className="font-medium">
                  Domail : <span className="text-gray-600">{item.domain}</span>
                </h1>
              </div>
            ))}
          </div>
          <form className="flex flex-col gap-3" onSubmit={handelSubmit}>
            <input
              type="text"
              required
              className="px-3 py-2 font-semibold placeholder-gray-500 text-black rounded-xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              placeholder="Team Name"
              aria-level="Team Name"
              name="teamName"
            />
            <button
              type="submit"
              className="px-2 font-bold text-white py-1 bg-blue-400 rounded-md mr-2"
            >
              Create New Team
            </button>
          </form>
        </div>
      ) : (
        ""
      )}
      <Modal
        open={open}
        teamLoading={teamLoading}
        teamData={teamData}
        setOpen={setOpen}
      />
    </div>
  );
};

export default RightSidebar;
