import { useTravel } from "../context/TravelContext";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CommentForm } from "../components/CommentForm"
import toast from 'react-hot-toast'

export const TravelCard = ({ travel }) => {
  const { deleteTravel } = useTravel()
  const { user } = useAuth()

  const handleDelete = async () => {
    const userConfirmed = window.confirm("¿Estás seguro de que deseas eliminar este viaje?")
    if (userConfirmed) {
      await deleteTravel(travel._id)
      toast.success("Viaje eliminado con éxito")
    }
  }

  const formatStartDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString();
    return formattedDate;
  }

  return (
    <div className="bg-gray-100 max-w-md w-full p-5 pt-1 rounded-md">
      {travel.imageUrl && (
        <img
          src={travel.imageUrl}
          alt={`Imagen para ${travel.title}`}
          className="w-full h-64 object-cover mt-4 rounded-md"
        />
      )}
      <header className="flex justify-between flex-col">
        <h2 className="text-2xl pt-2 font-semibold mb-4">{travel.title}</h2>
        <p><span className="pt-2 font-semibold mb-4">Autor:</span> {travel.user.username}</p>
        <p className="mb-2">Ubicación: {travel.location}</p>
        <p className="text-2x2 mb-2">
          Fecha inicio: {formatStartDate(travel.startDate)}
        </p>
        <p className="font-bold pb-2">
          Precio: ${travel.price}
        </p>
      </header>
        <div className="flex gap-x-2 mt-2 items-center justify-between pb-5">
          {user && (
            <>
              <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-500 cursor-pointer"
              >
                Eliminar
              </button>
              <Link to={`/edit-travel/${travel._id}`}>
                <p className="hover:text-red-500 cursor-pointer">Editar</p>
              </Link>
            </>
          )}
          <Link to={`/travel/${travel._id}`}><p className="hover:text-red-500 cursor-pointer">Ver más</p></Link>
        </div>
        <hr />
        <CommentForm travelId={travel.id} comments={travel.comments}/>
    </div>
  )
}
