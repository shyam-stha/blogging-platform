import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import userService from '../services/user.service.js';

passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email: string, password: string, done: any) => {
        try {
            const user = await userService.findUserByEmail(email);
            if (!user) {
                return done(null, false);
            } else {
                const isValidUser = await userService.isValidPassword(user.password, password);
                if (!isValidUser) {
                    return done(null, false);
                }
                return done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    })
);

export default passport;
