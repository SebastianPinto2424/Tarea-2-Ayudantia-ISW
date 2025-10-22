
"use strict";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { AppDataSource } from "../config/configDb.js";
import User from "../entities/user.entity.js";
import { JWT_SECRET } from "../config/configEnv.js";

const cookieExtractor = (req) => (req && req.cookies ? req.cookies.jwt : null);

const options = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    cookieExtractor,
    ExtractJwt.fromAuthHeaderAsBearerToken(), 
  ]),
  secretOrKey: JWT_SECRET,
};

export const passportJwtSetup = () => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const repo = AppDataSource.getRepository(User);
        const user = await repo.findOne({ where: { id: payload.id } });
        if (user && user.estado_activo) {
          return done(null, {
            id: user.id,
            email: user.email,
            rol: user.rol,
            nombre: user.nombre,
            apellido: user.apellido,
          });
        }
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
