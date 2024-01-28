/**
 * Esquema de mongoose para representar a un usuario.
 * @typedef {Object} UserSchema
 * @property {string} firstName - El nombre del usuario.
 * @property {string} lastName - El apellido del usuario.
 * @property {string} email - El correo electrónico del usuario.
 * @property {string} password - La contraseña del usuario.
 * @property {string} picturePath - La ruta de la imagen de perfil del usuario.
 * @property {Array} friends - La lista de amigos del usuario.
 * @property {string} location - La ubicación del usuario.
 * @property {string} occupation - La ocupación del usuario.
 * @property {number} viewedProfile - Número que representa perfiles visualizados por el usuario.
 * @property {number} impressions - Número que representa las impresiones del usuario.
 * @property {Date} createdAt - Fecha de creación del usuario (generada automáticamente).
 * @property {Date} updatedAt - Fecha de última actualización del usuario (generada automáticamente).
 */

import mongoose from "mongoose";

/**
 * Esquema de mongoose para representar a un usuario.
 * @type {mongoose.Schema<UserSchema>}
 */
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

/**
 * Modelo mongoose para la colección de usuarios.
 * @type {mongoose.Model<UserSchema>}
 */
const User = mongoose.model("User", userSchema);

export default User;