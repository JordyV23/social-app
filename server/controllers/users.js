import User from "../models/user.js";

/**
 * Obtiene la información de un usuario por su ID.
 *
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) de Express.
 * @param {Object} res - Objeto de respuesta (response) de Express.
 * @returns {Promise<void>} Promesa que se resuelve cuando la operación se completa.
 * @throws {Object} Objeto de error en caso de que el usuario no sea encontrado.
 *
 * @example
 * // Uso típico en una ruta de Express
 * app.get('/users/:id', getUser);
 */
export const getUser = async (req, res) => {
  try {
    // Extraer el ID del usuario de los parámetros de la solicitud
    const { id } = req.params;

    // Buscar al usuario en la base de datos por su ID
    const user = await User.findById(id);

    // Enviar una respuesta exitosa al cliente con la información del usuario
    res.status(200).json(user);
  } catch (error) {
    // En caso de error, enviar una respuesta de no encontrado con el mensaje de error
    res.status(404).json({ message: error.message });
  }
};

/**
 * Obtiene la lista de amigos de un usuario por su ID.
 *
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) de Express.
 * @param {Object} res - Objeto de respuesta (response) de Express.
 * @returns {Promise<void>} Promesa que se resuelve cuando la operación se completa.
 * @throws {Object} Objeto de error en caso de que el usuario no sea encontrado.
 *
 * @example
 * // Uso típico en una ruta de Express
 * app.get('/users/:id/friends', getUserFriends);
 */
export const getUserFriends = async (req, res) => {
  try {
    // Extraer el ID del usuario de los parámetros de la solicitud
    const { id } = req.params;

    // Buscar al usuario en la base de datos por su ID
    const user = await User.findById(id);

    // Obtener la información de todos los amigos del usuario
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // Formatear la información de los amigos antes de enviarla como respuesta
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    // Enviar una respuesta exitosa al cliente con la lista de amigos formateada
    res.status(200).json(formattedFriends);
  } catch (error) {
    // En caso de error, enviar una respuesta de no encontrado con el mensaje de error
    res.status(404).json({ message: error.message });
  }
};

/**
 * Añade o elimina a un usuario de la lista de amigos de otro usuario.
 *
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) de Express.
 * @param {Object} res - Objeto de respuesta (response) de Express.
 * @returns {Promise<void>} Promesa que se resuelve cuando la operación se completa.
 * @throws {Object} Objeto de error en caso de que la operación falle.
 *
 * @example
 * // Uso típico en una ruta de Express
 * app.put('/users/:id/friends/:friendId', addRemoveFriend);
 */
export const addRemoveFriend = async (req, res) => {
  try {
    // Extraer los ID del usuario y del amigo de los parámetros de la solicitud
    const { id, friendId } = req.params;

    // Buscar al usuario y al amigo en la base de datos por sus respectivos ID
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    // Verificar si el amigo ya está en la lista de amigos del usuario
    if (user.friends.includes(friendId)) {
      // Si está en la lista, eliminarlo de ambas listas
      user.friends = user.friends.filter((friend) => friend !== friendId);
      friend.friends = friend.friends.filter((friend) => friend !== id);
    } else {
      // Si no está en la lista, agregarlo a ambas listas
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    // Guardar los cambios en la base de datos
    await user.save();
    await friend.save();

    // Obtener la información actualizada de los amigos del usuario
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // Formatear la información de los amigos antes de enviarla como respuesta
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    // Enviar una respuesta exitosa al cliente con la lista de amigos actualizada
    res.status(200).json(formattedFriends);
  } catch (error) {
    // En caso de error, enviar una respuesta de no encontrado con el mensaje de error
    res.status(404).json({ message: error.message });
  }
};
