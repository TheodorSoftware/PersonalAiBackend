import { Request, Response } from "express";
import { UserCredetials, UserRegisterData, UserToken } from "../models/User.interface";
import UserService from "../services/userService.service";
import jwt from 'jsonwebtoken';
import { InsertOneResult } from "mongodb";
import nodemailer, { Transporter } from 'nodemailer';
import dotenv from 'dotenv';
import { MailOption } from "../models/MailOption.interface";

class UserController{

    private static transport: Transporter;
    private static mailOptionsCreate: MailOption;
    private static mailOptionForgot: MailOption;

    constructor(){
        dotenv.config();

        UserController.transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "0cb2d3a77c4c2c",
              pass: "2739145ce0a4ff"
            }
        });

        UserController.mailOptionsCreate = {
            from: process.env.EMAIL,
            to: '',    
            subject: 'Register Confirmation',
            html: `
                <div>
                    Welcome to Open AI Personal Assistant.
                    <button> Confirm </button>
                </div>
            `,
        };
        
        UserController.mailOptionForgot = {
            from: process.env.EMAIL,
            to: '',    
            subject: 'Forgot your password',
            html: `
                <div>
                    Welcome to Open AI Personal Assistant.
                    <button> Forgot your password </button>
                </div>
            `,
        }   
    }

    async login(request: Request, response: Response){
        if(request.body){
            let userCredetials: UserCredetials = request.body;
            let user = await UserService.getUserByCredentials(userCredetials);  
            if(user){
                const token = jwt.sign(
                        {userId: userCredetials.email},
                        'your-secret-key',
                        { expiresIn: '1h' }
                    )
                response.send(token);
                return 
            }else { 
                response.status(404).send(null);
            }
        };
    }

    async register(request: Request, response: Response){

        if(request.body){
            let userRegisterData: UserRegisterData = request.body;
            UserController.mailOptionsCreate.to = userRegisterData.email;
            let createResoponse: InsertOneResult<UserCredetials> | undefined = await UserService.createUser(userRegisterData);

            if(createResoponse?.acknowledged){
                response.send(createResoponse);
                UserController.transport.sendMail(UserController.mailOptionsCreate, (error: Error | null,info ) => {
                    if (error) {
                        return console.error('Error sending email:', error);
                      }
                      console.log('Email sent:', info.response);
                })
            }else {
                response.send('Already exists');
            }
        }
    }

    async forgotPassword(request: Request, response: Response){
        if(request.body){
            let emailAddress: {email: string} = request.body;
            let user = await UserService.getUserByEmail(emailAddress);
            if(user){
                response.send('Check your email')
                UserController.mailOptionForgot.to = emailAddress.email
                UserController.transport.sendMail(UserController.mailOptionForgot, (error,info) => {
                    if (error) {
                        return console.error('Error sending email:', error);
                      }
                      console.log('Email sent:', info.response);
                })
            } else {
                response.send('Email not found!');
            }
        }
    }
};

export default UserController;