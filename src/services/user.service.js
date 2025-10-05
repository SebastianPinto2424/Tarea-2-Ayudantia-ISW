
"use strict";
import bcrypt from "bcrypt";
import { AppDataSource } from "../config/configDb.js";
import User from "../entities/user.entity.js";

const repo = () => AppDataSource.getRepository(User);

export async function findUserById(id) {
  if (!id) return undefined;
  return await repo().findOne({ where: { id } });
}

export async function findUserByEmail(email) {
  if (!email) return undefined;
  return await repo().findOne({ where: { email } });
}


export async function createUser({ nombre, apellido, email, password, rol }) {
  const exists = await findUserByEmail(email);
  if (exists) throw new Error("El email ya está registrado");

  const hashed = await bcrypt.hash(password, 10);

  const newUser = repo().create({
    nombre: nombre || null,
    apellido: apellido || null,
    email,
    password: hashed,
    rol: rol || null,
    estado_activo: true
  });

  const saved = await repo().save(newUser);
  delete saved.password;
  return saved;
}

export async function updateUserById(userId, { email, password }) {
  const user = await findUserById(userId);
  if (!user) throw new Error("Usuario no encontrado");

  if (email && email !== user.email) {
    const exists = await findUserByEmail(email);
    if (exists && exists.id !== user.id) throw new Error("El email ya está en uso");
    user.email = email;
  }
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  const saved = await repo().save(user);
  delete saved.password;
  return saved;
}

export async function deleteUserById(userId) {
  const user = await findUserById(userId);
  if (!user) throw new Error("Usuario no encontrado");
  await repo().remove(user);
  return true;
}

export const updateOwnProfile = (userId, data) => updateUserById(userId, data);
export const deleteOwnAccount = (userId) => deleteUserById(userId);

