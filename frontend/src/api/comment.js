import axios from "./setCredentialsAxios";

// Obtener todos los comentarios para un viaje específico
export const getAllCommentsReq = (travelId) => axios.get(`/travel/${travelId}/comments`);

// Obtener un comentario específico por su ID
export const getCommentByIdReq = (travelId, commentId) => axios.get(`/travel/${travelId}/comment/${commentId}`);

// Crear un nuevo comentario para un viaje específico
export const createCommentReq = (travelId, comment) => axios.post(`/travel/${travelId}/comment`, comment);

// Actualizar un comentario específico por su ID
export const updateCommentReq = (travelId, commentId, comment) => axios.put(`/travel/${travelId}/comment/${commentId}`, comment);

// Eliminar un comentario específico por su ID
export const deleteCommentReq = (travelId, commentId) => axios.delete(`/travel/${travelId}/comment/${commentId}`);
