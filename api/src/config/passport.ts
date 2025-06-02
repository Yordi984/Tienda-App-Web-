import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { AppDataSource } from "../db";
import { Comprador } from "../entities";
import { Vendedor } from "../entities";

// Login para comprador
passport.use(
  "comprador-local",
  new LocalStrategy(
    { usernameField: "correo" },
    async (correo, password, done) => {
      try {
        const repo = AppDataSource.getRepository(Comprador);
        const user = await repo.findOneBy({ correo });

        if (!user)
          return done(null, false, { message: "Comprador no encontrado" });

        const match = await bcrypt.compare(password, user.password);
        if (!match)
          return done(null, false, { message: "Contraseña incorrecta" });

        return done(null, { ...user, tipo: "comprador" });
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Login para vendedor
passport.use(
  "vendedor-local",
  new LocalStrategy(
    { usernameField: "correo" },
    async (correo, password, done) => {
      try {
        const repo = AppDataSource.getRepository(Vendedor);
        const user = await repo.findOneBy({ correo });

        if (!user)
          return done(null, false, { message: "Vendedor no encontrado" });

        const match = await bcrypt.compare(password, user.password);
        if (!match)
          return done(null, false, { message: "Contraseña incorrecta" });

        return done(null, { ...user, tipo: "vendedor" });
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialización
passport.serializeUser((user: any, done) => {
  done(null, { id: user.id, tipo: user.tipo });
});

passport.deserializeUser(async (data: any, done) => {
  try {
    if (data.tipo === "comprador") {
      const repo = AppDataSource.getRepository(Comprador);
      const user = await repo.findOneBy({ id: data.id });
      done(null, user);
    } else {
      const repo = AppDataSource.getRepository(Vendedor);
      const user = await repo.findOneBy({ id: data.id });
      done(null, user);
    }
  } catch (err) {
    done(err);
  }
});

export default passport;
