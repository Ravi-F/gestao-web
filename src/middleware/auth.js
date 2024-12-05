import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../database/model/user.model.js';

// Configuração da estratégia local
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return done(null, false, { message: 'E-mail ou senha inválidos' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
          return done(null, user);
        }

        return done(null, false, { message: 'E-mail ou senha inválidos' });
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialização do usuário
passport.serializeUser ((user, done) => {
  done(null, { id: user.id, username: user.email });
});

// Desserialização do usuário
passport.deserializeUser ((user, done) => {
  done(null, user);
});

export default passport;