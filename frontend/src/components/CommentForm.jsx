import { useForm } from "react-hook-form";
import {
  createCommentReq,
  getAllCommentsReq
} from "../api/comment"
import { useAuth } from "../context/AuthContext";

export const CommentForm = ({ travelId, comments }) => {
  const { user } = useAuth()
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      // función de comentarios desde API
      await createCommentReq(travelId, data)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      console.error("Error al crear el comentario", error)
    }
  })
  
  return (
    <div className="p-6 pb-2">
      <h3 className="font-bold mb-3">Comentarios:</h3>
      <div className="flex flex-col items-start pt-0">
        <ul className="pb-1">
          {comments &&
            comments.map((comment) => (
              <li key={comment._id}>
                <span className="text-gray-400">{comment.user && comment.user.username}:</span>{" "}
                {comment.description}
              </li>
            ))}
        </ul>
      </div>
      {user && (
        <form onSubmit={onSubmit} className="rounded bg-gray-100 pt-4">
          <div>
            <textarea
              {...register("description", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="3"
              placeholder="Escribe tu mensaje..."
              ></textarea>
          </div>
          <button
            type="submit"
            className="flex items-center h-8 px-5 font-semibold rounded-md back-color text-white my-5 mb-0 mt-2"
            >
            Agregar Comentario
          </button>
        </form>
      )}
    </div>
  );
};
