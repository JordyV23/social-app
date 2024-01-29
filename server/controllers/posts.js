import Post from "../models/post.js";
import User from "../models/user.js";
/**
 * Crea una nueva publicación y la guarda en la base de datos.
 *
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) de Express.
 * @param {Object} res - Objeto de respuesta (response) de Express.
 * @returns {Promise<void>} Promesa que se resuelve cuando la operación se completa.
 * @throws {Object} Objeto de error en caso de fallo durante la creación de la publicación.
 *
 * @example
 * // Uso típico en una ruta de Express
 * app.post('/posts', createPost);
 */
export const createPost = async (req, res) => {
  try {
    // Extraer datos de la solicitud
    const { userId, description, picturePath } = req.body;

    // Buscar al usuario que creó la publicación en la base de datos
    const user = await User.findById(userId);

    // Crear una nueva instancia de la publicación con los datos proporcionados
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      location: user.location,
      description,
      picturePath,
      userPicturePath: user.picturePath,
      likes: {},
      comments: [],
    });

    // Guardar la nueva publicación en la base de datos
    await newPost.save();

    // Obtener la publicación recién creada desde la base de datos
    const post = await Post.findById(newPost._id);

    // Enviar una respuesta exitosa al cliente con la publicación creada
    res.status(201).json(post);
  } catch (error) {
    // En caso de error, enviar una respuesta de conflicto con el mensaje de error
    res.status(409).json({ message: error.message });
  }
};

/**
 * Obtiene todas las publicaciones del feed.
 *
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) de Express.
 * @param {Object} res - Objeto de respuesta (response) de Express.
 * @returns {Promise<void>} Promesa que se resuelve cuando la operación se completa.
 * @throws {Object} Objeto de error en caso de que no se puedan obtener las publicaciones del feed.
 *
 * @example
 * // Uso típico en una ruta de Express
 * app.get('/posts/feed', getFeedPosts);
 */
export const getFeedPosts = async (req, res) => {
  try {
    // Obtener todas las publicaciones desde la base de datos
    const posts = await Post.find();

    // Enviar una respuesta exitosa al cliente con las publicaciones obtenidas
    res.status(201).json(posts);
  } catch (error) {
    // En caso de error, enviar una respuesta de no encontrado con el mensaje de error
    res.status(404).json({ message: error.message });
  }
};

/**
 * Obtiene todas las publicaciones de un usuario por su ID.
 *
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) de Express.
 * @param {Object} res - Objeto de respuesta (response) de Express.
 * @returns {Promise<void>} Promesa que se resuelve cuando la operación se completa.
 * @throws {Object} Objeto de error en caso de que no se puedan obtener las publicaciones del usuario.
 *
 * @example
 * // Uso típico en una ruta de Express
 * app.get('/posts/user/:userId', getUserPosts);
 */
export const getUserPosts = async (req, res) => {
  try {
    // Extraer el ID del usuario de los parámetros de la solicitud
    const { userId } = req.params;

    // Obtener todas las publicaciones del usuario desde la base de datos
    const posts = await Post.find({ userId });

    // Enviar una respuesta exitosa al cliente con las publicaciones obtenidas
    res.status(201).json(posts);
  } catch (error) {
    // En caso de error, enviar una respuesta de no encontrado con el mensaje de error
    res.status(404).json({ message: error.message });
  }
};

/**
 * Maneja el "me gusta" o "no me gusta" de una publicación por parte de un usuario.
 *
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) de Express.
 * @param {Object} res - Objeto de respuesta (response) de Express.
 * @returns {Promise<void>} Promesa que se resuelve cuando la operación se completa.
 * @throws {Object} Objeto de error en caso de que no se pueda manejar el "me gusta" de la publicación.
 *
 * @example
 * // Uso típico en una ruta de Express
 * app.put('/posts/like/:id', likePost);
 */
export const likePost = async (req, res) => {
  try {
    // Extraer el ID de la publicación y el ID del usuario de los parámetros y el cuerpo de la solicitud
    const { id } = req.params;
    const { userId } = req.body;

    // Buscar la publicación en la base de datos por su ID
    const post = await Post.findById(id);

    // Verificar si el usuario ya ha dado "me gusta" a la publicación
    const isLiked = post.likes.get(userId);

    // Realizar la acción de dar o quitar "me gusta" según el estado actual
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    // Actualizar la publicación en la base de datos con la nueva información de "me gusta"
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    // Enviar una respuesta exitosa al cliente con la publicación actualizada
    res.status(201).json(updatedPost);
  } catch (error) {
    // En caso de error, enviar una respuesta de no encontrado con el mensaje de error
    res.status(404).json({ message: error.message });
  }
};
