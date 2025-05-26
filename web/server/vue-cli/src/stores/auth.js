import { defineStore } from 'pinia';
import { authService, handleThriftError } from "@cc-api";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: "",
    isAuthenticated: !!authService.getToken(),
    authParams: null,
    packageVersion: undefined
  }),

  getters: {
    token: () => authService.getToken()
  },

  actions: {
    async getAuthParams() {
      if (this.authParams) return this.authParams;

      return new Promise(resolve => {
        authService.getClient().getAuthParameters(
          handleThriftError(params => {
            this.authParams = params;
            resolve(params);
          }));
      });
    },

    async getLoggedInUser() {
      await this.getAuthParams();
      if (!this.authParams.requiresAuthentication) return "";

      if (this.currentUser) return this.currentUser;

      return new Promise(resolve => {
        authService.getClient().getLoggedInUser(
          handleThriftError(loggedInUser => {
            this.currentUser = loggedInUser;
            resolve(loggedInUser);
          }));
      });
    },

    async login(credentials) {
      return new Promise((resolve, reject) => {
        if (credentials.type === "oauth") {
          authService.getClient().performLogin(
            "oauth", credentials.provider + "@" + credentials.url,
            handleThriftError(token => {
              this.setAuth({
                userName: "OAuth @" + credentials.provider,
                token: token
              });
              resolve(token);
            }, err => {
              reject(err);
            }));
        }
        else if (credentials.type === "password"){
          authService.getClient().performLogin("Username:Password",
            `${credentials.username}:${credentials.password}`,
            handleThriftError(token => {
              this.setAuth({
                userName: credentials.username,
                token: token
              });
              resolve(token);
            }, err => {
              reject(err);
            }));
        }
        else {
          reject("Unknown option provided");
        }
      });
    },

    async logout() {
      return new Promise((resolve, reject) => {
        authService.getClient().destroySession(
          handleThriftError(success => {
            if (success) {
              this.purgeAuth();
              resolve();
            }
          }, err => {
            reject(err);
          }));
      });
    },

    setAuth(payload) {
      this.isAuthenticated = true;
      this.currentUser = payload.userName;
      authService.saveToken(payload.token);
    },

    purgeAuth() {
      this.isAuthenticated = false;
      this.currentUser = null;
      authService.destroyToken();
    }
  }
});