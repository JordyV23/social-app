import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Registrar usuario
export const register = async (req, res) => {
  try {
    // Obtener la informacion del body
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

    // Encriptar la password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Crear usuario con el esquema de mongoose
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

    // Guardar en bd
    const savedUser = await newUser.save();

    // Enviar respuesta exitosa si todo sale bien
    res.status(201).json(savedUser);
  } catch (err) {
    // Si no, enviar respuesta de error
    res.status(500).json({ error: err.message });
  }
};

// loguearse
export const login = async (req, res) => {
  try {
    // Desestructura los credenciales
    const { email, password } = req.body;
    // Busca en mongo una coincidencia
    const user = await User.findOne({ email: email });

    // Si no existe, retorna mensaje de error
    if (!user) return res.status(400).json({ msg: "Usuario inexistente" });

    // Si no, compara la password
    const isMatch = await bcrypt.compare(password, user.password);

    // Si no coincinde, retorna mensaje de error
    if (!isMatch) return res.status(400).json({ msg: "Contraseña Incorrecta" });

    // En caso de que todo salga bien, crea el JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    // Envia la respuesta con el token
    res.status(200).json({ token, user });
  } catch (err) {
    // Si algo sale mal envia respuesta de error
    res.status(500).json({ error: err.message });
  }
};
