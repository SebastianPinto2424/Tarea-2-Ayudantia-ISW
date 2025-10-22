"use strict";
import Joi from "joi";

export const usuarioBodyValidation = Joi.object({
  nombre: Joi.string()
    .max(100)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/)
    .required()
    .messages({
      "any.required": "El nombre es obligatorio. Formato: solo letras y espacios, máximo 100 caracteres.",
      "string.max": "El nombre no puede superar los 100 caracteres.",
      "string.pattern.base": "El nombre debe contener solo letras y espacios. Ejemplo: 'Nombre'."
    }),

  apellido: Joi.string()
    .max(100)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/)
    .required()
    .messages({
      "any.required": "El apellido es obligatorio. Formato: solo letras y espacios, máximo 100 caracteres.",
      "string.max": "El apellido no puede superar los 100 caracteres.",
      "string.pattern.base": "El apellido debe contener solo letras y espacios. Ejemplo: 'Apellido'."
    }),

  email: Joi.string()
    .email()
    .max(255)
    .required()
    .messages({
      "any.required": "El correo es obligatorio. Formato: correo válido con '@' y dominio. Ejemplo: 'usuario@test.com'.",
      "string.email": "Debe ser un correo válido. Ejemplo: 'usuario@test.com'.",
      "string.max": "El correo no puede tener más de 255 caracteres."
    }),

  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/)
    .required()
    .messages({
      "any.required": "La contraseña es obligatoria. Formato: mínimo 8 caracteres, incluir mayúscula, minúscula, número y un caracter especial.",
      "string.pattern.base": "La contraseña debe tener al menos 8 caracteres, incluir mayúscula, minúscula, número y un caracter especial. Ejemplo: 'ClaveSegura1!'."
    }),

  rol: Joi.string()
    .valid("admin", "organizador", "usuario")
    .max(30)
    .required()
    .messages({
      "any.required": "El rol es obligatorio. Valores permitidos: 'admin', 'organizador', 'usuario'.",
      "any.only": "El rol debe ser uno de los siguientes: 'admin', 'organizador' o 'usuario'.",
      "string.max": "El rol no puede tener más de 30 caracteres."
    }),

  estado_activo: Joi.boolean().optional()
}).options({
  allowUnknown: false,
  stripUnknown: true,
  abortEarly: false
});

export const usuarioUpdateValidation = Joi.object({
  email: Joi.string()
    .email()
    .max(255)
    .messages({
      "string.email": "Debe ser un correo válido. Ejemplo: 'usuario@test.com'.",
      "string.max": "El correo no puede tener más de 255 caracteres."
    }),

  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/)
    .messages({
      "string.pattern.base": "La contraseña debe tener al menos 8 caracteres, incluir mayúscula, minúscula, número y un caracter especial. Ejemplo: 'ClaveSegura1!'."
    })
}).options({
  allowUnknown: false,
  stripUnknown: true,
  abortEarly: false
});

