import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTravelByIdReq } from "../api/travel";
import { CommentForm } from "../components/CommentForm"
import toast from 'react-hot-toast'

export const TravelDetailPage = () => {
  const { id } = useParams();
  const [travel, setTravel] = useState(null);

  const handleDelete = async () => {
    await deleteTravel(travel._id);
    toast.success("Viaje eliminado con éxito");
  }

  useEffect(() => {
    const fetchTravelDetails = async () => {
      try {
        const response = await getTravelByIdReq(id);
        setTravel(response.data);
      } catch (error) {
        console.error("Error al obtener el viaje", error);
      }
    };

    fetchTravelDetails();
  }, [id]);

  if (!travel) {
    return <div>Loading...</div>;
  }

  const formatStartDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString();
    return formattedDate;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 m-5 mb-14 ">
      <div className="rounded-lg overflow-hidden shadow-lg mb-10 bg-gray-100">
        <img
          src={travel.imageUrl}
          alt={travel.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-2">{travel.title}</h1>
          <div className="flex items-center mb-4">
            <span className="text-gray-600 font-bold">Autor:</span>
            <span className="ml-2">{travel.user && travel.user.username}</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-gray-600">Ubicación:</span>
            <span className="ml-2">{travel.location}</span>
          </div>
          <p className="text-gray-700 mb-4">{travel.description}</p>
          <div className="flex items-center mb-4">
            <span className="text-gray-600">Costo:</span>
            <span className="ml-2">${travel.price}</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-gray-600">Fecha de inicio:</span>
            <span className="ml-2">{formatStartDate(travel.startDate)}</span>
          </div>
          <div className="flex items-center pb-5">
            <span className="text-gray-600">Fecha de fin:</span>
            <span className="ml-2">{formatStartDate(travel.endDate)}</span>
          </div>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-500 cursor-pointer"
          >
            Eliminar
          </button>
          <Link to={`/edit-travel/${travel._id}`}>
            <p className="hover:text-red-500 cursor-pointer">Editar</p>
          </Link>
          <hr />
        </div>
        <CommentForm travelId={id} comments={travel.comments}/>
      </div>
    </div>
  );
};