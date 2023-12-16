import axios from "./setCredentialsAxios";

export const getTravelReq = () => axios.get("/");

export const getTravelByIdReq = (id) => axios.get(`/travel/${id}`);

export const createTravelReq = (travel) => axios.post("/travel", travel);

export const updateTravelReq = (id, travel) => axios.put(`/travel/${id}`, travel);

export const deleteTravelReq = (id) => axios.delete(`/travel/${id}`);
