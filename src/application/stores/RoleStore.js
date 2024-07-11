import { makeObservable, observable } from "mobx";
import { Store } from "../../general/util-mobx-react";
import { roleClient } from "../clients/RoleClient";


export class RoleStore extends Store {

  constructor() {
    super();
    this.availableRoles = [];
    makeObservable(this, {
      availableRoles: observable
    });
  }

  onCreated() {
    this.loadRoles();
  }

  async loadRoles() {
    this.availableRoles.length = 0;
    const loadedRoles = await roleClient.getRoles(); 
    loadedRoles.map(role => this.availableRoles.push(role));
  }
}


