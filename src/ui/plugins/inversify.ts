import 'reflect-metadata'
import { container } from 'inversify-props'
import {ITaskRepository} from "@/app/modules/task/domain/Task.types";
import {AxiosCreator, HttpService, IAxiosCreator, IHttpService} from "@/app/shared/http";
import {TaskService} from "@/app/modules/task/infrastructure/TaskService";



export function containerBuilder() {
    container.addTransient<IAxiosCreator>(AxiosCreator)
    container.addTransient<IHttpService>(HttpService)
    container.addTransient<ITaskRepository>(TaskService)
}

containerBuilder()
