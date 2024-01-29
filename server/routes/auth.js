import express from "express";
import { login } from "../controllers/index.js";

/**
 * Objeto de enrutamiento para las rutas relacionadas con la autenticación.
 * @type {express.Router}
 */
const authRoutes = express.Router();

/**
 * Ruta para manejar la solicitud de inicio de sesión.
 * @name POST /login
 * @function
 * @memberof authRoutes
 * @inner
 * @param {string} path - La ruta para manejar la solicitud de inicio de sesión.
 * @param {function} middleware - Función de controlador para el inicio de sesión.
 * @example
 * // Uso típico en la configuración de Express
 * app.use('/auth', authRoutes);
 */
authRoutes.post("/login", login);

export default authRoutes;
