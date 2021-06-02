
import { Result } from 'neverthrow'
import {ParseError} from "@/app/shared/error/ParseError";
import {HttpError} from "@/app/shared/http";
export type TaskState = 'TODO' | 'DOING' | 'DONE'

export interface ITaskData {
  title: string
  description: string | null
  state: TaskState
  schedule: Date | null
  due: Date | null
}

export interface ITask extends ITaskData {
  validate(data: ITaskData): void
  changeState(state: TaskState): void
  serialize(): ITaskData
}

export interface ITaskRepository {
  create(): Promise<Result<ITaskData, ParseError | HttpError>>
  remove(): Promise<Result<ITaskData, ParseError | HttpError>>
  edit(): Promise<Result<ITaskData, ParseError | HttpError>>
  getMany(): Promise<Result<ITaskData[], ParseError | HttpError>>
  getOne(): Promise<Result<ITaskData, ParseError | HttpError>>
}