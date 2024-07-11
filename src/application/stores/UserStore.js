import { makeObservable, observable } from "mobx";
import { userClient } from "../clients/UserClient";
import { useLocation, useNavigate } from "react-router-dom";
import { Store } from "../../general/util-mobx-react";
import { parseJwt } from "../../general/components/parseJwt";
import { setUserStore } from "./getUserStore";

const now = () => (new Date()).getTime() / 1000;

export class UserStore extends Store {
  constructor(values) {
    super(values);

    this.users = null;

    this.user = null;
    this.tokensParsed = null;
    this.tokens = null;
    this.startedRefresh = false; 

    makeObservable(this, {
      users: observable,
      user: observable
    });
  }

  useHooks() {
    this.navigate = useNavigate();
    this.location = useLocation();
  }

  setTokens(tokens) {
    this.tokens = tokens; 
    this.tokensParsed = {
      token: parseJwt(tokens.token),
      refresh_token: parseJwt(tokens.refresh_token)
    }
    localStorage.setItem('authentication-tokens', JSON.stringify(tokens), { expires: Math.floor((now() - this.tokensParsed.refresh_token.exp) / 86400)});
  }

  async onCreated() {
    setUserStore(this);
    const cookieTokens = localStorage.getItem('authentication-tokens');
    if (cookieTokens) {
      this.setTokens(observable(JSON.parse(cookieTokens)));
      await this.refreshAccessTokenIfNeeded();
      this.getUserDetails();
    } else {
      setTimeout(() => this.logout(), 0);
    }
  }

  async refreshAccessTokenIfNeeded() {
    if (!this.tokens) return; 
    if (this.startedRefresh) return; // Ensure just one refresher
    this.startedRefresh = true;
    if (now() >= this.tokensParsed.token.exp) {
      let refreshedTokens;
      try {
        refreshedTokens = (await (userClient.refreshAccessToken(this.tokens.refresh_token)));
        this.setTokens({
          token: refreshedTokens.access_token, 
          refresh_token: refreshedTokens.refresh_token
        });
      } catch(error) {
        this.logout();
      }
    }

    const timeUntilRefrsesh = ((this.tokensParsed.token.exp - 60) - now()) * 1000; 
    setTimeout(() => {
      this.startedRefresh = false;
      this.refreshAccessTokenIfNeeded();
    }, timeUntilRefrsesh);   
  }
  
  async setTokensOnLogin(tokens) {
    this.setTokens(tokens);
    this.getUserDetails();
    this.refreshAccessTokenIfNeeded();
  }

  async getUserDetails() {
    if (!this.tokens) throw new Error("No tokens while trying to get user details!");
    try {
      this.user = observable(await userClient.getUserDetails());
      if (this.location.pathname === "/login") this.navigate("/");
    } catch (error) {
      this.logout();
    }
  }

  async loadUsers() {
    this.users = (await userClient.getUsers());
  }

  async reloadUsers() {
    if (this.users) {
      this.loadUsers();
    }
  }

  isUsernameAvailable(username) {
    if (this.users) {
      for (let user of this.users) {
        if (user.username === username) return false; 
      }
    }
    return true; 
  }

  logout() {
    localStorage.removeItem('authentication-tokens');
    this.user = null; 
    this.tokens = null; 
    this.navigate("/");
  }

  async deleteUser(user) {
    await userClient.deleteUser(user.id);
    user.active = 0;
  }

  async activateUser(user) {
    await userClient.activateUser(user.id);
    user.active = 1;
  }
}
