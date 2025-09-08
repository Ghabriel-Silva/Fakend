interface ILogin {
    email: string,
    password: string,
}
interface ITokenData {
    email:string, 
    name:string
}
export { ILogin, ITokenData }