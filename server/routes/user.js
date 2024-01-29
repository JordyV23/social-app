import express from "express";
import { getUser, getUserFriends, addRemoveFriend } from "../controllers/index.js";
import { verifyToken } from "../middleware/auth.js";

/**
 * Objeto de enrutamiento para las rutas relacionadas con los usuarios.
 * @type {express.Router}
 */
const userRoutes = express.Router();

/**
 * Ruta para obtener la información de un usuario por su ID.
 * @name GET /users/:id
 * @function
 * @memberof userRoutes
 * @inner
 * @param {string} path - La ruta para obtener la información de un usuario por su ID.
 * @param {function} middleware - Middleware de autenticación.
 * @param {function} handler - Función de controlador para obtener la información de un usuario.
 * @example
 * // Uso típico en la configuración de Express
 * app.use('/users', userRoutes);
 */
userRoutes.get("/:id", verifyToken, getUser);

/**
 * Ruta para obtener la lista de amigos de un usuario por su ID.
 * @name GET /users/:id/friends
 * @function
 * @memberof userRoutes
 * @inner
 * @param {string} path - La ruta para obtener la lista de amigos de un usuario por su ID.
 * @param {function} middleware - Middleware de autenticación.
 * @param {function} handler - Función de controlador para obtener la lista de amigos de un usuario.
 * @example
 * // Uso típico en la configuración de Express
 * app.use('/users', userRoutes);
 */
userRoutes.get("/:id/friends", verifyToken, getUserFriends);

/**
 * Ruta para agregar o eliminar a un usuario de la lista de amigos de otro usuario.
 * @name PUT /users/:id/friendId
 * @function
 * @memberof userRoutes
 * @inner
 * @param {string} path - La ruta para agregar o eliminar a un usuario de la lista de amigos de otro usuario.
 * @param {function} middleware - Middleware de autenticación.
 * @param {function} handler - Función de controlador para agregar o eliminar a un amigo.
 * @example
 * // Uso típico en la configuración de Express
 * app.use('/users', userRoutes);
 */
userRoutes.put("/:id/friendId", verifyToken, addRemoveFriend);

export default userRoutes;
