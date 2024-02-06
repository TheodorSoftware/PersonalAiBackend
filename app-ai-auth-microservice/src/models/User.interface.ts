import{ Schema, Document, model } from "mongoose";

export interface UserCredetials {
    email: string;
    password: string;
}

export interface UserRegisterData{
    email: string;
    password: string;
    name: string;
}

export interface UserToken{
    userCredetials: UserCredetials;
    token: string;
}

export interface IUserCredetials extends Document{
    email: string;
    password: string;
}

const userSchema: Schema<IUserCredetials> = new Schema<IUserCredetials>({
    email: String,
    password: String
})

const UserModel = model<IUserCredetials>('Users', userSchema);

export default UserModel;