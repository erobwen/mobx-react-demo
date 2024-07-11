import { ClientBase } from "./ClientBase";


/**
 * Role client
 */

export class RoleClient extends ClientBase {

  async getRoles() {
    try {
      return (await this.client.get("/api/roles/")).data;
    } catch (error) {
      this.handleError(error)
    }
  }

  // async getRoleByName(name) {
  //   try {
  //     return (await this.client.get("/api/rolebyname/" + name)).data.data;
  //   } catch (error) {
  //     this.handleError(error);
  //   }
  // }

  // async getRole(id) {
  //   try {
  //     return (await this.client.get("/api/roles/" + id)).data.data;
  //   } catch (error) {
  //     this.handleError(error);
  //   }
  // }
}

export const roleClient = new RoleClient(); 
