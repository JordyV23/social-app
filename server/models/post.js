/**
 * Esquema de mongoose para representar una publicación.
 * @typedef {Object} PostSchema
 * @property {string} userId - ID del usuario que creó la publicación.
 * @property {string} firstName - Nombre del usuario que creó la publicación.
 * @property {string} location - Ubicación asociada a la publicación.
 * @property {string} description - Descripción de la publicación.
 * @property {string} picturePath - Ruta de la imagen asociada a la publicación.
 * @property {string} userPicturePath - Ruta de la imagen de perfil del usuario que creó la publicación.
 * @property {Map} likes - Mapa de usuarios que dieron "me gusta" a la publicación.
 * @property {Array} comments - Lista de comentarios asociados a la publicación.
 * @property {Date} createdAt - Fecha de creación de la publicación (generada automáticamente).
 * @property {Date} updatedAt - Fecha de última actualización de la publicación (generada automáticamente).
 */

import mongoose from "mongoose";

/**
 * Modelo mongoose para la colección de publicaciones.
 * @type {mongoose.Model<PostSchema>}
 */
const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

/**
 * Modelo mongoose para la colección de publicaciones.
 * @type {mongoose.Model<PostSchema>}
 */
const Post = mongoose.model("Post", postSchema);

export default Post;