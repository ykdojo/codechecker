import { defineStore } from 'pinia';

export const useUrlStore = defineStore('url', {
  state: () => ({
    queries: {}
  }),

  actions: {
    clearQueries({ except } = {}) {
      if (except) {
        Object.keys(this.queries).forEach(key => {
          if (!except.includes(key))
            delete this.queries[key];
        });
      } else {
        this.queries = {};
      }
    },

    setQueries({ location, query }) {
      this.queries[location] = query;
    }
  }
});