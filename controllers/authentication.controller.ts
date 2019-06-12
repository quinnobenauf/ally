import * as bcrypt from "bcrypt";
import * as express from "express";
import * as jwt from "jsonwebtoken";
import * as passport from "passport";
import * as session from "express-session";

import PassportOAuth from "../middlewares/googlePassport.middleware";
import Controller from "../interfaces/controller.interface";
import userModel from "../model/user.model";
import UserWithThatEmailAlreadyExistsException from "../exceptions/UserWithThatEmailAlreadyExistsException";
import WrongCredentialsException from "../exceptions/WrongCredentialsException";
import DataStoredInToken from "../interfaces/dataStoredInToken.interface";
import User from "../interfaces/user.interface";
import TokenData from "../interfaces/tokendata.interface";
import CreateUserDto from "../dtos/createUser.dto";
import validationMiddleware from "../middlewares/validation.middleware";

class AuthenticationController implements Controller {
  public path = "/auth";
  public router = express.Router();
  public googlePassport: PassportOAuth;
  private user = userModel;

  constructor() {
    this.googlePassport = new PassportOAuth();
    this.router.use(session({ secret: "dogs" }));
    this.router.use(passport.initialize());
    this.router.use(passport.session());
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(
      `${this.path}/google`,
      passport.authenticate("google", {
        scope: ["https://www.googleapis.com/auth/plus.login", "email"]
      })
    );
    this.router.get(
      `${this.path}/google/callback`,
      passport.authenticate("google", {
        failureRedirect: "/",
        successRedirect: '/#/dashboard'
      }),
      (req, res) => {
        console.log("req", req.params.user);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(req.params.user);
      }
    );
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(CreateUserDto),
      this.register
    );
    this.router.post(`${this.path}/login`, this.login);
  }

  private createToken(user: User): TokenData {
    const expiresIn = 60 * 60; // 1 hour
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn })
    };
  }

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${
      tokenData.expiresIn
    }`;
  }

  private register = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const userData = req.body;
    if (await this.user.findOne({ email: userData.email })) {
      next(new UserWithThatEmailAlreadyExistsException(userData.email));
    } else {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await this.user.create({
        ...userData,
        password: hashedPassword
      });
      console.log(user);
      user.password = undefined;
      const tokenData = this.createToken(user);
      res.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
      res.send(user);
    }
  };

  private login = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const loginData = req.body;
    console.log("YOOOOOOO");
    const user = await this.user.findOne({ email: loginData.email });
    if (user) {
      console.log("USER EXISTS?");
      // const isPasswordMatching = await bcrypt.compare(
      //   loginData.password,
      //   user.password
      // );
      const isPasswordMatching = true;
      console.log("CHECKING PASSWORDS");
      if (isPasswordMatching) {
        console.log("PASSWORD MATCHES?");
        user.password = undefined;
        const tokenData = this.createToken(user);
        console.log("MAKE A TOKEN");
        res.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
        res.send(user);
      } else {
        next(new WrongCredentialsException());
      }
    } else {
      next(new WrongCredentialsException());
    }
  };
}

export default AuthenticationController;
