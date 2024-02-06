import { AnyObject } from "mongoose";
import UserModel, { UserCredetials, UserRegisterData } from "../models/User.interface";
import { InsertOneResult, WithId } from "mongodb";

export default class UserService {

    private static USERS: string = 'Users';

    constructor(){}


    public static async getAllUsers(){
        try{
            return await UserModel.db.collection(this.USERS).findOne({}).then((user) => {
                return user;
            });
        } catch( error){
            return error;
        }
    };

    public static async getUserByCredentials(userCredetials: UserCredetials){
        try{
            return await UserModel.db.collection(this.USERS).findOne({
                    email: userCredetials.email,
                    password: userCredetials.password
                }).then((foundUser) => {
                    return foundUser;
                });
        }catch (error){
            return error
        }
    };

    public static async getUserByEmail(emailObj: {email: string}){
        try{
            return await UserModel.db.collection(this.USERS).findOne( { email: emailObj.email } ).then( (foundUser) => {
                return foundUser
            })
        }catch(error){
            return error
        }
    }

    public static async checkExistingUser(userCredentials: UserCredetials){
        try{
            let check = await this.getUserByCredentials(userCredentials) ? true : false;
            return check;
        }catch (error: any) {
            return error;
        }
    }
    
    public static async createUser(userRegisterData: UserRegisterData): Promise<InsertOneResult<UserCredetials> | undefined>{
        try{
            let userCredentials: UserCredetials = { 
                email: userRegisterData.email,
                password: userRegisterData.password
            } as UserCredetials
            if(await this.checkExistingUser(userCredentials)){
                return undefined
            }
            return await UserModel.db.collection(this.USERS).insertOne( userCredentials );
        } catch(error){
            return undefined
        }
    }
};
