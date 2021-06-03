import 'reflect-metadata'
import { container } from 'inversify-props'
import {AxiosCreator, HttpService, IAxiosCreator, IHttpService} from "@/app/shared/http";
import {ITaskRepository} from "@/app/modules/task/domain/Task.types";
import {TaskService} from "@/app/modules/task/infrastructure/TaskService";
import {GetMany, IUseCase} from "@/app/modules/task/usecase/GetMany";
import {IStorage, IStoreCreator, StoreCreator, Storage} from "@/app/shared/storage/Storage";


export function containerBuilder() {
    container.addTransient<IAxiosCreator>(AxiosCreator)
    container.addTransient<IHttpService>(HttpService)
    container.addTransient<ITaskRepository>(TaskService)
    container.addTransient<IUseCase>(GetMany)
    container.addSingleton<IStoreCreator>(StoreCreator)
    container.addSingleton<IStorage>(Storage)
}

containerBuilder()
