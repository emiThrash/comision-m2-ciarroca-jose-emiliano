import Travel from "../models/travel.model.js";

//TODO: GET Todos los viajes
export const getAllTravels = async (req, res) => {
  try {
    const allTravels = await Travel.find()
    .populate({ path: "user", select: 'username' }) // se muestra info de users
    .populate({ path: "comments", populate: { path: "user", select: "username" } }) // se muestra info de comments

    res.status(200).json(allTravels);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al buscar todos los viajes", error });
  }
};

//TODO: GET viaje por ID
export const getTravelById = async (req, res) => {
  const { id } = req.params;
  try {
    const travelFound = await Travel.findById(id)
    .populate({ path: "user", select: 'username' }) // se muestra info de users
    .populate({ path: "comments", populate: { path: "user", select: "username" } }) // se muestra info de comments

    if (!travelFound)
      return res.status(404).json({ message: "No se encontró la viaje" });
    res.status(200).json(travelFound);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al buscar el viaje por Id", error });
  }
};

//TODO: POST Crear viaje
export const createTravel = async (req, res) => {
  const { title, description, location, startDate, endDate, price, imageUrl } = req.body;
  try {
    const newTravel = new Travel({
      title,
      description,
      location,
      startDate,
      endDate,
      price,
      imageUrl,
      //En caso de agregar lógica a cada user
      user: req.user.id,
    });

    const savedTravel = await newTravel.save();
    res.status(200).json(savedTravel);
  } catch (error) {
    return res.status(400).json({ message: "Error al crear el viaje", error });
  }
}

//TODO: PUT Actualizar viaje
export const updateTravel = async (req, res) => {
  try {
    const updatedTravel = await Travel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("user");

    if (!updateTravel)
      return res.status(404).json({ message: "viaje no encontrado" });

    res.status(200).json(updatedTravel);
  } catch (error) {}
};

//TODO: DELETE Eliminar viaje
export const deleteTravel = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTravel = await Travel.findByIdAndDelete(id);

    if (!deletedTravel)
      return res.status(404).json({ success: false, message: "No se encontró el viaje para eliminar" });

    res.status(200).json({ success: true, message: "Viaje eliminado con éxito" });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Error al intentar eliminar el viaje", error });
  }
};
