import { useForm } from "react-hook-form";
import { useTravel } from "../context/TravelContext";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const TravelFormPage = () => {
  const { register, handleSubmit, setValue, setError, formState: { errors, isDirty }  } = useForm()

  const { createTravel, getTravelById, updateTravel } = useTravel()
  const navigate = useNavigate()

  //carga la aplicación lea ese parametro de la url
  const params = useParams()

  useEffect(() => {
    async function loadTravel() {
      if (params.id) {
        const travel = await getTravelById(params.id)

        //el setValue del useForm
        setValue("title", travel.title);
        setValue("description", travel.description);
        setValue("location", travel.location);
        setValue("startDate", travel.startDate);
        setValue("endDate", travel.endDate);
        setValue("price", travel.price);
        setValue("imageUrl", travel.imageUrl);
      }
    }
    loadTravel();
  }, [params.id, setValue])

  const onSubmit = handleSubmit( async (data, e) => {
    e.preventDefault()

    if (!data.title) {
      setError("title", {
        type: "manual",
        message: "Por favor, completa este campo",
      });
    }

    if (!data.description) {
      setError("description", {
        type: "manual",
        message: "Por favor, completa este campo",
      });
    }

    if (!data.location) {
      setError("location", {
        type: "manual",
        message: "Por favor, completa este campo",
      });
    }

    if (!data.startDate) {
      setError("startDate", {
        type: "manual",
        message: "Por favor, completa este campo",
      });
    }

    if (!data.endDate) {
      setError("endDate", {
        type: "manual",
        message: "Por favor, completa este campo",
      });
    }

    if (!data.price) {
      setError("price", {
        type: "manual",
        message: "Por favor, completa este campo",
      });
    }

    if (!data.imageUrl) {
      setError("imageUrl", {
        type: "manual",
        message: "Por favor, completa este campo",
      });
    }
    // error
    if (Object.keys(errors).length === 0 && isDirty) {
      // Realizar acción del formulario
      if (params.id) {
        await updateTravel(params.id, data);
      } else {
        await createTravel(data);
      }
    }
    setTimeout(() => {
      // Redirige al usuario al inicio
      navigate("/");
    }, 2000);
  })

  return (
    <>     
      <div className="bg-white h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-10 rounded-md bg-gray-100">
          <form onSubmit={onSubmit}>
            <label htmlFor="title">Título</label>
            <input
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              type="text"
              placeholder="Titulo"
              {...register("title")}
              autoFocus
            />
            <label htmlFor="description">Información</label>
            <textarea
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              rows="3"
              placeholder="Descripción"
              {...register("description")}
            ></textarea>

            <label>Locación</label>
            <input
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              type="text"
              placeholder="Ubicación"
              {...register("location")}
              autoFocus
            />

            <label htmlFor="startDate">Inicio del Viaje</label>
            <input
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              type="date"
              {...register("startDate")}
            />

            <label htmlFor="endDate">Fin del Viaje</label>
            <input
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              type="date"
              {...register("endDate")}
            />

            <label htmlFor="price">Costo</label>
            <input
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              type="number"
              placeholder="Precio"
              {...register("price")}
            />

            <label htmlFor="imageUrl">URL de la Imagen</label>
            <input
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              type="text"
              placeholder="URL de la Imagen"
              {...register("imageUrl")}
            />
            {Object.keys(errors).length > 0 && (
              <p className="text-red-500">Por favor, completa todos los campos</p>
            )}
            <button
              className="flex items-center h-8 px-7 font-semibold rounded-md back-color text-white my-5"
              type="submit"
            >
              {params.id ? 'Actualizar' : 'Crear'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
