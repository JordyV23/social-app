import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

/**
 * Registra un nuevo usuario en la base de datos.
 *
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) de Express.
 * @param {Object} res - Objeto de respuesta (response) de Express.
 * @returns {Promise<void>} Promesa que se resuelve cuando la operación se completa.
 * @throws {Object} Objeto de error en caso de fallo durante el registro.
 *
 * @example
 * // Uso típico en una ruta de Express
 * app.post('/registro', register);
 */
/**
 * Registra un nuevo usuario en la base de datos.
 *
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) de Express.
 * @param {Object} res - Objeto de respuesta (response) de Express.
 * @returns {Promise<void>} Promesa que se resuelve cuando la operación se completa.
 * @throws {Object} Objeto de error en caso de fallo durante el registro.
 *
 * @example
 * // Uso típico en una ruta de Express
 * app.post('/registro', register);
 */
export const register = async (req, res) => {
  try {
    // Obtener la información del cuerpo de la solicitud
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Crear un nuevo usuario utilizando el esquema de Mongoose
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    // Guardar el nuevo usuario en la base de datos
    const savedUser = await newUser.save();

    // Enviar una respuesta exitosa si todo sale bien
    res.status(201).json(savedUser);
  } catch (err) {
    // Enviar una respuesta de error si algo falla durante el registro
    res.status(500).json({ error: err.message });
  }
};

/**
 * Autentica a un usuario y genera un token JWT para la sesión.
 *
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) de Express.
 * @param {Object} res - Objeto de respuesta (response) de Express.
 * @returns {Promise<void>} Promesa que se resuelve cuando la operación se completa.
 * @throws {Object} Objeto de error en caso de fallo durante el proceso de autenticación.
 *
 * @example
 * // Uso típico en una ruta de Express
 * app.post('/login', login);
 */
export const login = async (req, res) => {
  try {
    // Desestructura los credenciales
    const { email, password } = req.body;

    // Busca en la base de datos MongoDB una coincidencia con el correo electrónico
    const user = await User.findOne({ email: email });

    // Si no existe, retorna un mensaje de error
    if (!user) return res.status(400).json({ msg: "Usuario inexistente" });

    // Compara la contraseña proporcionada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);

    // Si las contraseñas no coinciden, retorna un mensaje de error
    if (!isMatch) return res.status(400).json({ msg: "Contraseña incorrecta" });

    // En caso de que todo salga bien, crea un token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Elimina la contraseña del objeto de usuario antes de enviar la respuesta
    delete user.password;

    // Envia la respuesta con el token y la información del usuario (sin la contraseña)
    res.status(200).json({ token, user });
  } catch (err) {
    // Si algo sale mal, envía una respuesta de error
    res.status(500).json({ error: err.message });
  }
};
