import { ParseError } from "../error/ParseError";

export interface Callbacks {
    respondWithSuccess(data: any): void
    respondWithClientError(error: Error): void
    respondWithServerError(error: Error): void
    respondWithParseError(error: ParseError): void

}

export interface UseCaseInteractor {
    execute(params: any, callbacks: Callbacks): void
}
