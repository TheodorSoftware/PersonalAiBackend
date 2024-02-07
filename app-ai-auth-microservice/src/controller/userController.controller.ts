import { Request, Response } from "express";
import { UserCredetials, UserRegisterData } from "../models/User.interface";
import { InsertOneResult } from "mongodb";
import { MailOption } from "../models/MailOption.interface";
import { generateRecoverEmail } from "../utils/generateEmailContent.function";


import UserService from "../services/userService.service";
import jwt from 'jsonwebtoken';
import nodemailer, { Transporter } from 'nodemailer';
import dotenv from 'dotenv';
import { generateCode } from "../utils/generateCode.function";

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
            html: undefined
        };
        
        UserController.mailOptionForgot = {
            from: process.env.EMAIL,
            to: '',    
            subject: 'Forgot your password',
            html: undefined
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
            const emailAddress: {email: string} = request.body;
            const user = await UserService.getUserByEmail(emailAddress);
            if(user){
                const recoveryCode:number = generateCode(4);

                UserController.mailOptionForgot.html = generateRecoverEmail(recoveryCode);
                UserController.mailOptionForgot.to = emailAddress.email;
                UserController.transport.sendMail(UserController.mailOptionForgot, (error,info) => {
                    if (error) {
                        return console.error('Error sending email:', error);
                      }
                      console.log('Email sent:', info.response);
                })

                const recoveryToken = jwt.sign( 
                    {recoveryCode},
                    'your-secret-key',
                    { expiresIn: '1h' }
                )

                response.send(recoveryToken);
            } else {
                response.status(404).send('Email not found!');
            }
        }
    }
};

export default UserController;