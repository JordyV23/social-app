/**
 * Middleware para verificar la autenticación del usuario a través de un token JWT.
 *
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) de Express.
 * @param {Object} res - Objeto de respuesta (response) de Express.
 * @param {Function} next - Función para pasar al siguiente middleware en la cadena.
 * @returns {Promise<void>} Promesa que se resuelve cuando la verificación se completa.
 * @throws {Object} Objeto de error en caso de que la verificación falle.
 *
 * @example
 * // Uso típico en una ruta de Express
 * app.get('/ruta-protegida', verifyToken, (req, res) => {
 *   // La ruta solo será accesible si el token es válido
 *   res.json({ mensaje: 'Acceso permitido' });
 * });
 */
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    // Obtener el token del encabezado de la solicitud
    let token = req.header("Authorization");

    // Verificar si el token no está presente
    if (!token) {
      return res.status(403).send("Acceso denegado");
    }

    // Eliminar el prefijo "Bearer " si está presente
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    // Verificar el token con la clave secreta
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Adjuntar la información del usuario verificado al objeto de solicitud (req)
    req.user = verified;

    // Pasar al siguiente middleware en la cadena
    next();
  } catch (err) {
    // Enviar una respuesta de error si la verificación falla
    res.status(500).json(err);
  }
};
