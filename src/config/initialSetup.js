/*
"use strict";
import bcrypt from "bcryptjs";
import { AppDataSource } from "./configDb.js";
import User from "../entity/user.entity.js";

async function encryptPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

export async function createUsers() {
try {
    const userRepository = AppDataSource.getRepository(User);
    const count = await userRepository.count();
    if (count > 0) return;

    const now = new Date();

    // Crear usuarios iniciales para el sistema de rally
    await Promise.all([
    userRepository.save(
        userRepository.create({
        nombre: "Admin",
        apellido: "Sistema",
        email: "admin@rally.com",
        password: await encryptPassword("admin123"),
        rol: "admin",
        estado_activo: true,
        fecha_registro: now,
        })
    ),
    userRepository.save(
        userRepository.create({
        nombre: "Organizador",
        apellido: "Rally",
        email: "organizador@rally.com",
        password: await encryptPassword("org123"),
        rol: "organizador",
        estado_activo: true,
        fecha_registro: now,
        })
    ),
    userRepository.save(
        userRepository.create({
        nombre: "Usuario",
        apellido: "Demo",
        email: "usuario@rally.com",
        password: await encryptPassword("user123"),
        rol: "usuario",
        estado_activo: true,
        fecha_registro: now,
        })
    ),
    ]);

console.log("* => Usuarios creados exitosamente");
} catch (error) {
    console.error("Error al crear usuarios:", error);
}
}
*/

/*
"use strict";
import bcrypt from "bcrypt";
import { AppDataSource } from "./configDb.js";
import User from "../entities/user.entity.js";

async function encryptPassword(password) {
  return await bcrypt.hash(password, 10);
}

export async function createUsers() {
  try {
    const repo = AppDataSource.getRepository(User);
    const count = await repo.count();
    if (count > 0) return;

    const now = new Date();
    await Promise.all([
      repo.save(
        repo.create({
          nombre: "Admin",
          apellido: "Sistema",
          email: "admin@rally.com",
          password: await encryptPassword("admin123"),
          rol: "admin",
          estado_activo: true,
          fecha_registro: now,
        })
      ),
      repo.save(
        repo.create({
          nombre: "Organizador",
          apellido: "Rally",
          email: "organizador@rally.com",
          password: await encryptPassword("org123"),
          rol: "organizador",
          estado_activo: true,
          fecha_registro: now,
        })
      ),
      repo.save(
        repo.create({
          nombre: "Usuario",
          apellido: "Demo",
          email: "usuario@rally.com",
          password: await encryptPassword("user123"),
          rol: "usuario",
          estado_activo: true,
          fecha_registro: now,
        })
      ),
    ]);

    console.log("* => Usuarios creados exitosamente");
  } catch (error) {
    console.error("Error al crear usuarios:", error);
  }
}
*/

"use strict";
import bcrypt from "bcrypt";
import { AppDataSource } from "./configDb.js";
import User from "../entities/user.entity.js";

async function hash(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

export async function createUsers() {
  try {
    const userRepo = AppDataSource.getRepository(User);
    const seeds = [
      { email: "admin@rally.com",       rawPassword: "admin123" },
      { email: "organizador@rally.com", rawPassword: "org123"   },
      { email: "usuario@rally.com",     rawPassword: "user123"  },
    ];

    const creados = [];
    const omitidos = [];

    for (const s of seeds) {
      const yaExiste = await userRepo.findOne({ where: { email: s.email } });
      if (yaExiste) {
        omitidos.push(s.email);
        continue;
      }
      const u = userRepo.create({
        email: s.email,
        password: await hash(s.rawPassword),
      });
      await userRepo.save(u);
      creados.push(s.email);
    }

    if (creados.length > 0) {
      console.log("* => Usuarios creados exitosamente:");
      for (const email of creados) console.log(`   - ${email}`);
      //console.log("   (credenciales de ejemplo: admin123 / org123 / user123)");
    }

    if (omitidos.length > 0) {
      //console.log("* => Seed omitido para usuarios que ya existían:");
      for (const email of omitidos) console.log(`   - ${email}`);
    }

    if (creados.length === 0 && omitidos.length === 0) {
      console.log("* => No hay usuarios de seed definidos.");
    }
  } catch (error) {
    console.error("Error al crear usuarios:", error?.message ?? error);
  }
}
