import { defineStore } from 'pinia';

export const useErrorStore = defineStore('error', {
  state: () => ({
    errors: []
  }),

  actions: {
    addError(error) {
      console.warn(error);
      this.errors.push(error);
    },

    clearErrors() {
      this.errors = [];
    }
  }
});