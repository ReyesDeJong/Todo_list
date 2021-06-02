import { containerBuilder } from "@/ui/plugins/inversify";
import { IUserRepository } from "@/app/user/domain/User.types";
import { MockAuthService } from "@/app/user/infrastructure/__tests__/AuthService.mock";
import { IRootState } from "@/ui/store/Store.types";
import { IStoreCreator } from "@/ui/store/StoreCreator";
import { createLocalVue, mount } from "@vue/test-utils";
import { cid, container, mockSingleton, resetContainer } from "inversify-props";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex, { Store } from "vuex";
import Login from "@/ui/components/users/Login.vue";
import { TestActions } from "@/app/shared/http";
import flushPromises from "flush-promises";

describe("Login Component", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  Vue.use(Vuetify);
  let vuetify: Vuetify;
  containerBuilder();
  const storeCreator = container.get<IStoreCreator>(cid.StoreCreator);
  let store: Store<IRootState>;

  beforeEach(() => {
    resetContainer();
    containerBuilder();
    mockSingleton<IUserRepository>(cid.AuthService, MockAuthService);
    vuetify = new Vuetify();
    store = storeCreator.create();
    localStorage.clear();
  });

  it("should save user in store and save token on login click", async () => {
    container.bind<TestActions>("ActionType").toConstantValue("ok");
    const wrapper = mount(Login, {
      localVue,
      store,
      vuetify,
    });
    await wrapper.setData({ username: "test", password: "test" });
    const button = wrapper.find("#login");
    button.trigger("click");
    await flushPromises();
    // check store for user data
    expect(store.state.users.userData.username).toEqual("username");
    // check localStorage for token
    expect(localStorage.getItem("token")).toEqual("token");
  });
  it("should not create user if data is empty", async () => {
    container.bind<TestActions>("ActionType").toConstantValue("ok");
    const wrapper = mount(Login, {
      localVue,
      store,
      vuetify,
    });
    await wrapper.setData({
      username: "",
    });
    const button = wrapper.find("#login");
    button.trigger("click");
    await flushPromises();
    expect(store.state.users.userData).toStrictEqual({});
    expect(localStorage.getItem("token")).toBeNull();
  });
  it("should emit register event", () => {
    const wrapper = mount(Login, {
      localVue,
      store,
      vuetify,
    });
    const button = wrapper.find("#register");
    button.trigger("click");
    expect(wrapper.emitted().registerClick).toBeTruthy();
  });
});
