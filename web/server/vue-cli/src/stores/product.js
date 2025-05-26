import { defineStore } from 'pinia';
import { handleThriftError, prodService } from "@cc-api";

export const useProductStore = defineStore('product', {
  state: () => ({
    currentProduct: null,
    currentProductConfig: null
  }),

  actions: {
    async getCurrentProduct(endpoint) {
      if (!endpoint) {
        this.currentProduct = null;
        return;
      }

      return new Promise(resolve => {
        prodService.getClient().getCurrentProduct(handleThriftError(product => {
          this.currentProduct = product;
          resolve(product);
        }));
      });
    },

    async getCurrentProductConfig(productId) {
      if (!productId) {
        this.currentProductConfig = null;
        return;
      }

      return new Promise(resolve => {
        prodService.getClient().getProductConfiguration(productId,
          handleThriftError(config => {
            this.currentProductConfig = config;
            resolve(config);
          }));
      });
    }
  }
});