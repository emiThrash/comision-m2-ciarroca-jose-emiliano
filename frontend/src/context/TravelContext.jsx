import { createContext, useContext, useState } from "react";
import {
  createTravelReq,
  getTravelReq,
  deleteTravelReq,
  getTravelByIdReq,
  updateTravelReq,
} from "../api/travel";

const TravelContext = createContext();

export const useTravel = () => {
  const context = useContext(TravelContext);
  if (!context) throw new Error("Error en el contexto de los viajes");
  return context;
};

export const TravelProvider = ({ children }) => {
  //generamos los viajes y sus estados para exportar en el provider
  const [travel, setTravel] = useState([]);

  //1) Crear
  const createTravel = async (travel) => {
    // console.log(travel);
    const res = await createTravelReq(travel);
    // console.log(res);
  };

  //2) Buscar
  const getAllTravel = async () => {
    try {
      const res = await getTravelReq();
      if (res.data) {
        setTravel(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //3) Eliminar
  const deleteTravel = async (id) => {
    try {
      const res = await deleteTravelReq(id);
      // console.log(res);
      if (res.status === 200) setTravel(travel.filter((travel) => travel._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  //4) Buscar por Id
  const getTravelById = async (id) => {
    try {
      const res = await getTravelByIdReq(id);
      // console.log(res);
      //retornamos para que lo pueda ver en el travelFormPage
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  //5) Actualizar
  const updateTravel = async (id, travel) => {
    try {
      const res = await updateTravelReq(id, travel);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TravelContext.Provider
      value={{
        travel,
        createTravel,
        getAllTravel,
        deleteTravel,
        getTravelById,
        updateTravel,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};
