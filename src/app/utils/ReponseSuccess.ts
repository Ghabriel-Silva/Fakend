export const formatSuccess = <T>(data: T, message = "success") => ({
    status: "success",
    message,
    data,
})
