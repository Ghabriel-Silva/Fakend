interface IResponseSuccess<T> {
    status: string,
    message:string
    data:T
}
export {IResponseSuccess}