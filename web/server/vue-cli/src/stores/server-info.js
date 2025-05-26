import { defineStore } from 'pinia';
import { handleThriftError, serverInfoService } from "@cc-api";

export const useServerInfoStore = defineStore('serverInfo', {
  state: () => ({
    packageVersion: undefined
  }),

  actions: {
    async getPackageVersion() {
      return new Promise(resolve => {
        if (this.packageVersion !== undefined)
          return resolve(this.packageVersion);

        serverInfoService.getClient().getPackageVersion(handleThriftError(
          version => {
            this.packageVersion = version;
            resolve(version);
          }));
      });
    }
  }
});