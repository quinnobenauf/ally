import * as passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import userModel from '../model/user.model';

class GooglePassportOAuth {
    userId: string;
    displayName: string;
    email: string;
    clientId: string;
    secret: string;
    user = userModel;

    constructor() {
        this.clientId = process.env.GOOGLE_ID;
        this.secret = process.env.GOOGLE_SECRET;

        passport.use('google', new GoogleStrategy({
            clientID: this.clientId,
            clientSecret: this.secret,
            callbackURL: "/auth/google/callback",
        },
        async (accessToken: any, refreshToken: any, profile: any, done: any) => {
            try {
                const user = await this.user.findOne({ email: profile.emails[0].value });
                console.log(profile);
                if (!user) {
                    const newUser = await this.user.create({
                        firstName: profile['name'].givenName,
                        lastName: profile['name'].familyName,
                        email: profile.emails[0].value
                    });
                    console.log(newUser);

                    return done(null, newUser);
                } else {
                    return done(null, user);
                }
            } catch(error) {
                return done(error, false, error.message);
            }
            // process.nextTick( () => {
            //     console.log('validating google profile:' + JSON.stringify(profile));
            //     this.userId = profile.id;
            //     this.displayName = profile.displayName;
            //     this.email = profile.emails[0].value;
            //     return done(null, profile);
            // });
        }));

        passport.serializeUser((user: any, done: any) => {
            done(null, user);
        });

        passport.deserializeUser((user: any, done: any) => {
            done(null, user);
        });
    }
}

export default GooglePassportOAuth;
