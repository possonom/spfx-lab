/*
This is a helper to deal with the fact that the error passed in a catch clause is of type unknown in typescript 
getErrorMessage() will get a string from the error in any case
Usage:
    try {
        ...
    } catch (error: unknown) {    
        const errMessage = getErrorMessage(error);
    }

https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
*/

type ErrorWithMessage = {
    message: string
}
  
function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
    return (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as Record<string, unknown>).message === 'string'
    )
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
    if (isErrorWithMessage(maybeError)) return maybeError

    try {
        return new Error(JSON.stringify(maybeError))
    } catch {
        // fallback in case there's an error stringifying the maybeError (like with circular references for example).
        return new Error(String(maybeError))
    }
}

export function getErrorMessage(error: unknown): string {
    return toErrorWithMessage(error).message
}
