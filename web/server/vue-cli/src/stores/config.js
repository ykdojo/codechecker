import { defineStore } from 'pinia';
import { confService, handleThriftError } from "@cc-api";

export const useConfigStore = defineStore('config', {
  state: () => ({
    announcement: undefined
  }),

  actions: {
    async getAnnouncement() {
      return new Promise(resolve => {
        if (this.announcement !== undefined) {
          resolve(this.announcement);
        } else {
          confService.getClient().getNotificationBannerText(
            handleThriftError(announcement => {
              this.announcement = window.atob(announcement);
              resolve(announcement);
            }));
        }      
      });
    }
  }
});