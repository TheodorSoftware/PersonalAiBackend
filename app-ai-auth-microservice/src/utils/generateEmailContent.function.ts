import { generateCode } from "./generateCode.function";

export function generateRecoverEmail(recoveryCode: number): string{

    const recoverString = `
    <head>
        <style>
            div{
                display:flex,
                flex-direction: column,
                align-items: center,
                justify-content: center
            }
        </style>
    </head>
    <div>
        <h3> Your code its the following. It will expire in 15 minutes </h3>
        <h2> ${recoveryCode} </h2>
    </div>    
    `
    return recoverString
}