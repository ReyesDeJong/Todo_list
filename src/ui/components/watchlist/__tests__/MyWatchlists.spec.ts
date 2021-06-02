import { containerBuilder } from "@/ui/plugins/inversify";
import { IWatchlistRepository } from "@/app/watchlist/domain";
import { MockWatchlistService } from "@/app/watchlist/infrastructure/__tests__/WatchlistService.mock";
import { TestActions } from "@/app/shared/http";
import { createLocalVue, mount } from "@vue/test-utils";
import { cid, container, mockSingleton, resetContainer } from "inversify-props";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import MyWatchlists from "@/ui/components/MyWatchlists.vue";
import flushPromises from "flush-promises";
import { IStoreCreator } from "@/ui/store/StoreCreator";

describe("List Watchlist", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  Vue.use(Vuetify);
  let vuetify: Vuetify;
  const storeCreator = container.get<IStoreCreator>(cid.StoreCreator);
  const store = storeCreator.create();

  beforeEach(() => {
    resetContainer();
    containerBuilder();
    mockSingleton<IWatchlistRepository>(
      cid.WatchlistService,
      MockWatchlistService
    );
    vuetify = new Vuetify();
  });

  it("should mount and fetch watchlists", async () => {
    container.bind<TestActions>("ActionType").toConstantValue("ok");
    const wrapper = mount(MyWatchlists, {
      localVue,
      store,
      vuetify,
    });
    await flushPromises();
    const expected = [
      {
        title: "watchlist 1",
        owner: "owner 1",
      },
      {
        title: "watchlist 2",
        owner: "owner 1",
      },
    ];
    const wrappers = wrapper.findAll(".v-list-item__title").wrappers;
    wrappers.forEach((item, index) => {
      expect(item.text()).toEqual(expected[index].title);
    });
  });
});
