import mongoose from "mongoose";

export const connectMongo = async (dbUrl) => {
  try {
    await mongoose.connect(dbUrl)
    console.log("Base de Datos conectada")
  } catch (error) {
    console.log("Error al conectarse a la Base de Datos", error)
  }
}
