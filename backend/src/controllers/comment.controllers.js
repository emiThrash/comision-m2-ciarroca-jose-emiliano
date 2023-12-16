import Comment from "../models/comment.model.js";
import travelModel from "../models/travel.model.js";

// GET Todos los comments
export const getAllComments = async (req, res) => {
  try {
    const allComments = await Comment.find().populate("user");

    res.status(200).json(allComments);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al buscar todos los comentarios", error });
  }
};

// GET comentario segun ID
export const getCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    const commentFound = await Comment.findById(id);

    if (!commentFound)
      return res.status(404).json({ message: "No se encontró el comentario" });

    res.status(200).json(commentFound);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al buscar el comentario por Id", error });
  }
};

// POST Crear comment
export const createComment = async (req, res) => {
  const { travelId } = req.params;
  const { description } = req.body;

  try {
    const newComment = new Comment({
      description,
      user: req.user.id,
    });

    newComment.travel = travelId

    await newComment.save()

    const populatedComment = await Comment.findById(newComment._id).populate('user')

    await travelModel.findByIdAndUpdate(
      travelId,
      { $push: { comments: newComment._id } },
      { new: true }
    ).populate('comments.user')

    res.status(200).json(populatedComment)
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al crear el comentario", error });
  }
};

// PUT Actualizar comment
export const updateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("user");

    if (!updatedComment)
      return res.status(404).json({ message: "Comentario no encontrado" });

    res.status(200).json(updatedComment);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al intentar actualizar el comentario", error });
  }
};

// DELETE Eliminar comment
export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment)
      return res
        .status(404)
        .json({ message: "No se encontró el comentario para eliminar" });

    res.status(200).json({ message: "Comentario eliminado" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al intentar eliminar el comentario", error });
  }
};
