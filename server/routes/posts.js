import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

/**
 * Objeto de enrutamiento para las rutas relacionadas con las publicaciones.
 * @type {express.Router}
 */
const postRoutes = express.Router();

/**
 * Ruta para obtener las publicaciones del feed.
 * @name GET /posts
 * @function
 * @memberof postRoutes
 * @inner
 * @param {string} path - La ruta para obtener las publicaciones del feed.
 * @param {function} middleware - Middleware de autenticación.
 * @param {function} handler - Función de controlador para obtener las publicaciones del feed.
 * @example
 * // Uso típico en la configuración de Express
 * app.use('/posts', postRoutes);
 */
postRoutes.get("/", verifyToken, getFeedPosts);

/**
 * Ruta para obtener las publicaciones de un usuario por su ID.
 * @name GET /posts/:userId/posts
 * @function
 * @memberof postRoutes
 * @inner
 * @param {string} path - La ruta para obtener las publicaciones de un usuario por su ID.
 * @param {function} middleware - Middleware de autenticación.
 * @param {function} handler - Función de controlador para obtener las publicaciones de un usuario.
 * @example
 * // Uso típico en la configuración de Express
 * app.use('/posts', postRoutes);
 */
postRoutes.get("/:userId/posts", verifyToken, getUserPosts);

/**
 * Ruta para manejar el "me gusta" de una publicación.
 * @name PATCH /posts/:id/like
 * @function
 * @memberof postRoutes
 * @inner
 * @param {string} path - La ruta para manejar el "me gusta" de una publicación.
 * @param {function} middleware - Middleware de autenticación.
 * @param {function} handler - Función de controlador para manejar el "me gusta" de una publicación.
 * @example
 * // Uso típico en la configuración de Express
 * app.use('/posts', postRoutes);
 */
postRoutes.patch("/:id/like", verifyToken, likePost);

export default postRoutes;
