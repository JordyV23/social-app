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
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
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
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (error) {
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
    const { id, friendId } = req.params;

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
