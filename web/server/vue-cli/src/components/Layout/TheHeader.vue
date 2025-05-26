<template>
  <v-app-bar
    extension-height="24px"
    app
    color="primary"
    dark
  >
    <template
      v-if="announcement && announcement.length"
      #extension
    >
      <v-system-bar
        color="#ff9800"
        absolute
        height="24px"
        light
      >
        <v-row>
          <v-col
            class="py-0"
            align="center"
          >
            <v-icon>mdi-bullhorn-outline</v-icon>
            <span class="font-weight-bold">
              {{ announcement }}
            </span>
          </v-col>
        </v-row>
      </v-system-bar>
    </template>

    <v-app-bar-nav-icon>
      <v-avatar
        size="36px"
      >
        <img
          alt="Logo"
          src="@/assets/logo.png"
        >
      </v-avatar>
    </v-app-bar-nav-icon>

    <v-toolbar-title class="pl-0">
      CodeChecker {{ packageVersion }}
    </v-toolbar-title>

    <v-chip
      v-if="currentProductDisplayName"
      class="mx-2"
      outlined
    >
      {{ currentProductDisplayName }}
    </v-chip>

    <v-spacer />

    <span
      v-if="showMenuItems"
    >
      <v-btn
        v-for="item in menuItems"
        :key="item.name"
        :to="{
          name: item.route,
          query: queries[item.query_namespace] === undefined
            ? item.query || {}
            : queries[item.query_namespace]
        }"
        :class="item.active.includes(route.name) &&
          'v-btn--active router-link-active'"
        :exact="item.exact"
        text
      >
        <v-icon left>
          {{ item.icon }}
        </v-icon>
        {{ item.name }}
      </v-btn>
    </span>

    <v-menu
      v-if="showConfigItems"
      location="bottom"
    >
      <template #activator="{ props }">
        <v-btn
          text
          :class="configureMenuItems.map(c => c.route).includes(route.name) &&
            'v-btn--active router-link-active'"
          v-bind="props"
        >
          <v-icon left>
            mdi-cog-outline
          </v-icon>
          Configuration
          <v-icon right>
            mdi-menu-down
          </v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="item in configureMenuItems"
            :key="item.title"
            :to="{ name: item.route }"
            exact
          >
            <template #prepend>
              <v-icon>{{ item.icon }}</v-icon>
            </template>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>

    <v-divider
      v-if="showUserInfo && menuItems.length"
      class="mx-2"
      inset
      vertical
      :style="{ display: 'inline' }"
    />

    <user-info-menu
      v-if="showUserInfo"
    />

    <v-menu location="bottom">
      <template #activator="{ props }">
        <v-btn
          icon
          v-bind="props"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <header-menu-items />
    </v-menu>
  </v-app-bar>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

import { GET_ANNOUNCEMENT, GET_PACKAGE_VERSION } from "@/store/actions.type";

import { defaultReportFilterValues } from "@/components/Report/ReportFilter";
import { defaultStatisticsFilterValues } from "@/components/Statistics";
import HeaderMenuItems from "./HeaderMenuItems";
import UserInfoMenu from "./UserInfoMenu";

export default defineComponent({
  name: "TheHeader",
  components: {
    HeaderMenuItems,
    UserInfoMenu
  },

  setup() {
    const store = useStore();
    const route = useRoute();

    const menuButtons = ref([
      {
        name: "Products",
        query_namespace: "products",
        icon: "mdi-briefcase-outline",
        route: "products",
        active: [ "products" ],
        exact: true,
        hide: [ "products", "login", "404" ]
      },
      {
        name: "Runs",
        query_namespace: "runs",
        icon: "mdi-run-fast",
        route: "runs",
        active: [ "runs", "main_runs" ],
        exact: true,
        hide: [ "products", "login", "404" ]
      },
      {
        name: "Reports",
        query_namespace: "report_filter",
        icon: "mdi-bug",
        route: "reports",
        active: [ "reports" ],
        exact: true,
        query: defaultReportFilterValues,
        hide: [ "products", "login", "404" ]
      },
      {
        name: "Statistics",
        query_namespace: "report_filter",
        icon: "mdi-chart-line",
        route: "statistics",
        active: [ "statistics" ],
        exact: false,
        query: defaultStatisticsFilterValues,
        hide: [ "products", "login", "404" ]
      }
    ]);

    const configureMenuItems = ref([
      {
        title: "Cleanup Plan",
        icon: "mdi-sign-direction",
        route: "cleanup-plan"
      },
      {
        title: "Review Status Rules",
        icon: "mdi-format-list-checkbox",
        route: "review-status-rules"
      },
      {
        title: "Source Component",
        icon: "mdi-puzzle-outline",
        route: "source-component"
      }
    ]);

    const currentProductDisplayName = computed(() => {
      const currentProduct = store.getters.currentProduct;
      return currentProduct
        ? window.atob(currentProduct.displayedName_b64)
        : null;
    });

    const menuItems = computed(() => {
      if (!route.name) return [];

      return menuButtons.value.filter(item => {
        return !item.hide || !item.hide.includes(route.name);
      });
    });

    const showMenuItems = computed(() => {
      const authParams = store.getters.authParams;
      const isAuthenticated = store.getters.isAuthenticated;
      return !authParams?.requiresAuthentication || isAuthenticated;
    });

    const showUserInfo = computed(() => {
      const authParams = store.getters.authParams;
      const isAuthenticated = store.getters.isAuthenticated;
      return authParams?.requiresAuthentication && isAuthenticated;
    });

    const showConfigItems = computed(() => {
      return ![ "products", "login", "404" ].includes(route.name) &&
        showMenuItems.value;
    });

    onMounted(() => {
      store.dispatch(GET_ANNOUNCEMENT);
      store.dispatch(GET_PACKAGE_VERSION);
    });

    return {
      route,
      menuButtons,
      configureMenuItems,
      currentProductDisplayName,
      menuItems,
      showMenuItems,
      showUserInfo,
      showConfigItems,
      announcement: computed(() => store.getters.announcement),
      packageVersion: computed(() => store.getters.packageVersion),
      queries: computed(() => store.getters.queries)
    };
  }
});
</script>