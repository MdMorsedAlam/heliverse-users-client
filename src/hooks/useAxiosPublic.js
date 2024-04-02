import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://heliverse-users-server-theta.vercel.app/api",
});
// http://localhost:1212/api
// https://heliverse-users-server-theta.vercel.app/api
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
