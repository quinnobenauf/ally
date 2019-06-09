import * as bcrypt from "bcrypt";
import * as express from "express";
import * as jwt from "jsonwebtoken";
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
  private user = userModel;

  constructor() {
    console.log("INSIDE CONSTRUCTOR");
    this.initializeRoutes();
  }

  public initializeRoutes() {
    console.log("INITIALIZING ROUTES");
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(CreateUserDto),
      this.register
    );
    console.log("REGISTER INITIALIZED");
    this.router.post(`${this.path}/login`, this.login);
    console.log("LOGIN INITIALIZED");
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
