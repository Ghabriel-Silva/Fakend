interface ILogin {
    email: string,
    password: string,
}
interface ITokenData {
    userId: number;
    email: string;
    name?: string;
}
export { ILogin, ITokenData }