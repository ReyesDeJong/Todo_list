import { containerBuilder } from "@/ui/plugins/inversify";
import { IUserRepository } from "@/app/user/domain/User.types";
import { MockAuthService } from "@/app/user/infrastructure/__tests__/AuthService.mock";
import { IStoreCreator } from "@/ui/store/StoreCreator";
import { createLocalVue, mount } from "@vue/test-utils";
import { cid, container, mockSingleton, resetContainer } from "inversify-props";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex, { Store } from "vuex";
import { TestActions } from "@/app/shared/http";
import RegisterUser from "@/ui/components/users/RegisterUser.vue";
import flushPromises from "flush-promises";
import { IRootState } from "@/ui/store/Store.types";

describe("RegisterUser Component", () => {
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
  });

  it("should create user on click", async () => {
    container.bind<TestActions>("ActionType").toConstantValue("ok");
    const wrapper = mount(RegisterUser, {
      localVue,
      store,
      vuetify,
    });
    await wrapper.setData({
      username: "test",
      name: "test",
      email: "test",
      lastName: "test",
      password: "test",
      institution: "test",
      role: "test",
      roles: ["test"],
    });
    const button = wrapper.find("#send");
    button.trigger("click");
    await flushPromises();
    expect(store.state.users.userData).toStrictEqual({
      username: "username",
      name: "name",
      email: "email",
      lastName: "last name",
      password: null,
      token: null,
      institution: "institution",
      role: "role",
    });
  });
  it("should not create user if data is empty", async () => {
    container.bind<TestActions>("ActionType").toConstantValue("ok");
    const wrapper = mount(RegisterUser, {
      localVue,
      store,
      vuetify,
    });
    await wrapper.setData({
      username: "",
      name: "",
      email: "",
      lastName: "",
      password: "",
      institution: "",
      role: "",
    });
    const button = wrapper.find("#send");
    button.trigger("click");
    await flushPromises();
    expect(store.state.users.userData).toStrictEqual({});
  });
});
