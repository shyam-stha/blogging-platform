import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import passport from 'passport';
import userService from '../services/user.service.js';
dotenv.config();

let options: any = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey =
    process.env.JWT_SECRET ||
    '15de08acca03ebdc8257b7298fb3c21d7a7819a2fb84ec64c0bf5b229c4c38819b447d19b7e4f7aef52af5268719d9c3';

passport.use(
    new JwtStrategy(options, async (payload: any, done: any) => {
        try {
            const user = await userService.findUserByEmail(payload.email);
            if (!user) {
                return done(null, false);
            } else {
                return done(null, user);
            }
        } catch (error) {
            return done(error, false);
        }
    })
);
