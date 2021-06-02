import { cid, container, mockTransient, resetContainer } from "inversify-props"
import { containerBuilder } from "@/ui/plugins/inversify"
import { IAxiosCreator, IHttpService } from "@/app/shared/http"
import { MockAxiosCreator, TestActions } from "@/app/shared/http/HttpService.mock"
import {ITaskRepository} from "@/app/modules/task/domain/Task.types";
import { TaskService } from "../TaskService"


beforeEach(() => {
    resetContainer()
    containerBuilder()
    mockTransient<IAxiosCreator>(cid.AxiosCreator, MockAxiosCreator)
})
describe('TaskService', () => {
    describe('getMany', () => {
        it('should get tasks', async () => {
            container.bind<TestActions>('ActionType').toConstantValue('ok')
            const httpService = container.get<IHttpService>(cid.HttpService)
            const service = new TaskService(httpService)
            const result = await service.getMany()
            expect(result.isOk()).toBeTruthy()
        })
        it('should return error result', async () => {
            container.bind<TestActions>('ActionType').toConstantValue('error')
            const service = container.get<ITaskRepository>(cid.TaskService)
            const result = await service.getMany()
            expect(result.isErr()).toBeTruthy()
        })
        it('should return error result on timeout', async () => {
            container.bind<TestActions>('ActionType').toConstantValue('timeout')
            const service = container.get<ITaskRepository>(cid.TaskService)
            const result = await service.getMany()
            expect(result.isErr()).toBeTruthy()
        })
    })
})
