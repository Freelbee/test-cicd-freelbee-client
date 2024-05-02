export class ErrorHelper {
    static GetErrorMessageOrDefault (error: unknown) {
        if(ErrorHelper.isAnyErrorWithMessage(error)) {
            return error.message;
        }
        if(ErrorHelper.isFetchBaseQueryError(error) && ErrorHelper.isAnyErrorWithMessage(error.data)) {
            return error.data.message;
        }
        return 'An unknown error has occurred. Please contact our support.'
    }


    /**
     * Type predicate to narrow an unknown error to `FetchBaseQueryError`
     */
    private static isFetchBaseQueryError (error: unknown): error is {status: number, data: unknown} {
        return typeof error === 'object' 
        && error != null && 'status' in error && 'data' in error;
    }

    /**
     * Type predicate to narrow an unknown error data to our backend error response
     */
    // private static isErrorsResponse (errorData: unknown): errorData is ErrorsResponse {
    //     return typeof errorData === 'object' 
    //     && errorData != null 
    //     && 'messages' in errorData
    //     && 'type' in errorData
    //     && 'status' in errorData;
    // }
    
    /**
     * Type predicate to narrow an unknown error to an object with a string 'message' property
    */
    private static isAnyErrorWithMessage (error: unknown): error is { message: string } {
        return (typeof error === 'object' &&
        error != null &&
        'message' in error &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        typeof (error as any)?.message === 'string');
    }

    /**
     * Type predicate to narrow an unknown error to an object with a status' property
    */
    private static isErrorWithStatus (error: unknown): error is { status: string | number} {
        return (typeof error === 'object' &&
        error != null &&
        'status' in error);
    }
}