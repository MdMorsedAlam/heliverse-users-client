import PropTypes from "prop-types";

import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Loading from "../../pages/Loading/Loading";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = ({ setOpen, teamLoading, open, teamData }) => {
  console.log(teamData);
  const handleClose = () => {
    setOpen(false);
  };
  if (teamLoading) {
    return <Loading />;
  }
  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <div className="grid p-10 grid-cols-2 gap-4">
          {teamData?.map((item) => (
            <div
              className="bg-stone-200 p-2 shadow-xl rounded-lg"
              key={item.teamUsers[0]._id}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={item.teamUsers[0].avatar}
                    alt={item.teamUsers[0].avatar}
                  />
                  <div className="flex text-xl font-bold gap-2">
                    <h1>{item.teamUsers[0].first_name}</h1>
                    <h1>{item.teamUsers[0].last_name}</h1>
                  </div>
                </div>
              </div>
              <div className="pl-3 py-3">
                <h3 className="text-lg font-semibold">
                  Gender :{" "}
                  <span className="text-gray-600">
                    {item.teamUsers[0].gender}
                  </span>
                </h3>
                <h3 className="text-lg font-semibold">
                  Domain :{" "}
                  <span className="text-gray-600">
                    {item.teamUsers[0].domain}
                  </span>
                </h3>
                <h3 className="text-lg font-semibold">
                  Email :{" "}
                  <span className="text-gray-600">
                    {item.teamUsers[0].email}
                  </span>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </Dialog>
    </React.Fragment>
  );
};
Modal.propTypes = {
  setOpen: PropTypes.func,
  teamLoading: PropTypes.bool,
  open: PropTypes.bool,
  teamData: PropTypes.array,
};
export default Modal;
