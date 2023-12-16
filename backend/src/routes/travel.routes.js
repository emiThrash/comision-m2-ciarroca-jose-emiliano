import { Router } from "express";
import {
  createTravel,
  deleteTravel,
  getAllTravels,
  getTravelById,
  updateTravel,
} from "../controllers/travel.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const routes = Router();

routes.get("/", getAllTravels);
routes.get("/travel/:id", authRequired, getTravelById);
routes.post("/travel", authRequired, createTravel);
routes.delete("/travel/:id", authRequired, deleteTravel);
routes.put("/travel/:id", authRequired, updateTravel);

import {
  createComment,
  deleteComment,
  getAllComments,
  getCommentById,
  updateComment,
} from "../controllers/comment.controllers.js";

routes.get("/travel/:travelId/comments", getAllComments);
routes.get("/travel/:travelId/comment/:commentId", authRequired, getCommentById);
routes.post("/travel/:travelId/comment", authRequired, createComment);
routes.delete("/travel/:travelId/comment/:commentId", authRequired, deleteComment);
routes.put("/travel/:travelId/comment/:commentId", authRequired, updateComment);

export default routes;
