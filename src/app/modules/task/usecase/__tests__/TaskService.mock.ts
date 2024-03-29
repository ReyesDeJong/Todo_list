import { ParseError } from "@/app/shared/error/ParseError";
import { HttpError } from "@/app/shared/http";
import { TestActions } from "@/app/shared/http/HttpService.mock";
import { inject } from "inversify-props";
import { err, ok, Result } from "neverthrow";
import { mockTaskData } from "../../domain/__tests__/Task.mock";
import {ITaskData, ITaskRepository} from "@/app/modules/task/domain/Task.types";

export class MockTaskService implements ITaskRepository {
    actionType: TestActions
    constructor(@inject('ActionType') actionType: TestActions) {
        this.actionType = actionType
    }
    create(): Promise<Result<ITaskData, ParseError | HttpError>> {
        throw new Error("Method not implemented.");
    }
    remove(): Promise<Result<ITaskData, ParseError | HttpError>> {
        throw new Error("Method not implemented.");
    }
    edit(): Promise<Result<ITaskData, ParseError | HttpError>> {
        throw new Error("Method not implemented.");
    }
    getMany(): Promise<Result<ITaskData[], ParseError | HttpError>> {
        if (this.actionType === 'ok') {
            return new Promise((resolve) => {
                resolve(ok(mockTaskData()))
            })
        }
        else if (this.actionType === 'clientError') {
            return new Promise((reject) => {
                reject(err(new HttpError(404)))
            })
        }
        else if (this.actionType === 'serverError') {
            return new Promise((reject) => {
                reject(err(new HttpError(500)))
            })
        }
        else {
            return new Promise((reject) => {
                reject(err(new ParseError('Error parsing data')))
            })
        }
    }
    getOne(): Promise<Result<ITaskData, ParseError | HttpError>> {
        throw new Error("Method not implemented.");
    }

}
