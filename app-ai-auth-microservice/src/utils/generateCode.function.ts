export function generateCode(numberOfDigits: number): number{
    return Math.floor(Math.random() * (Math.pow(10,(numberOfDigits - 1)) * 9)) + Math.pow(10,(numberOfDigits - 1));
}