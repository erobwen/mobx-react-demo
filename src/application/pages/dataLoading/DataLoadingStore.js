import { action, makeObservable, observable } from "mobx";
import { Store } from "../../../general/util-mobx-react";
import { userClient } from "../../clients/UserClient";

export class DataLoadingStore extends Store {
  constructor() {
    super();
    this.users = [];
    this.loading = true; 

    makeObservable(this, {
      users: observable,
      loading: observable
    })
  }

  onCreated() {
    this.loadFromServer();
  }

  async loadFromServer(count) {
    try {
      this.users = await userClient.getUsers();
      this.loading = false; 
    } catch (error) {
      console.log("Display somewhere: " + error.message);
    }
  }
};  

