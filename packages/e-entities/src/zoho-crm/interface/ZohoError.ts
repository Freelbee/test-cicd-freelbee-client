export interface ZohoError {
    code: string,
    details: unknown,
    message: string,
    status: "error"
}