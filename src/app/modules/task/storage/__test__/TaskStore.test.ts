import { cid, container, mockTransient, resetContainer } from "inversify-props"
import { createLocalVue } from '@vue/test-utils'
import { containerBuilder } from "@/ui/plugins/inversify"
import { TestActions } from "@/app/shared/http/HttpService.mock"
import { IStorage } from "@/app/shared/storage/Storage"
import { HttpError } from "@/app/shared/http"
import { ParseError } from "@/app/shared/error/ParseError"
import Vuex from 'vuex'
import {ITaskRepository} from "@/app/modules/task/domain/Task.types";
import {MockTaskService} from "@/app/modules/task/usecase/__tests__/TaskService.mock";
import { mockTaskData } from "../../domain/__tests__/Task.mock"


const Vue = createLocalVue()
Vue.use(Vuex)

beforeEach(() => {
    resetContainer()
    containerBuilder()
    mockTransient<ITaskRepository>(cid.TaskService, MockTaskService)
})

describe('TaskStore', () => {
    describe('Actions', () => {
        describe('fetchTasks', () => {
            it('should respond with success', async () => {
                container.bind<TestActions>('ActionType').toConstantValue('ok')
                const storage = container.get<IStorage>(cid.Storage)
                const store = storage.getStores().taskStore
                await store.fetchTasks()
                expect(store.taskList).toStrictEqual(mockTaskData())
                expect(store.error).toBeNull()
                expect(store.loading).toBeFalsy()
            })
            it('should respond with client error', async () => {
                container.bind<TestActions>('ActionType').toConstantValue('clientError')
                const storage = container.get<IStorage>(cid.Storage)
                const store = storage.getStores().taskStore
                await store.fetchTasks()
                expect(store.taskList).toStrictEqual([])
                expect(store.error).toBeInstanceOf(HttpError)
                expect(store.loading).toBeFalsy()
            })
            it('should respond with server error', async () => {
                container.bind<TestActions>('ActionType').toConstantValue('serverError')
                const storage = container.get<IStorage>(cid.Storage)
                const store = storage.getStores().taskStore
                await store.fetchTasks()
                expect(store.taskList).toStrictEqual([])
                expect(store.error).toBeInstanceOf(HttpError)
                expect(store.loading).toBeFalsy()
            })
            it('should respond with parse error', async () => {
                container.bind<TestActions>('ActionType').toConstantValue('parseError')
                const storage = container.get<IStorage>(cid.Storage)
                const store = storage.getStores().taskStore
                await store.fetchTasks()
                expect(store.taskList).toStrictEqual([])
                expect(store.error).toBeInstanceOf(ParseError)
                expect(store.loading).toBeFalsy()
            })
        })
    })
})
