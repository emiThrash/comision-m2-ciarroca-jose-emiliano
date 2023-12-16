import axios from "./setCredentialsAxios";

//Pedidos al servidor con AXIOS

//Se crea registerReq con un user por atributo y vamos a pasarle a la petición con ese USER
export const registerReq = (user) => axios.post(`/register`, user);

//Creamos el loginRequest
export const loginRequest = (user) => axios.post(`/login`, user);

//Creamos la verificación del TOKEN desde el FRONT
export const verifyToken = () => axios.get(`/verifyToken`);
