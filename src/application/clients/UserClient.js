
import { getUserStore } from "../stores/getUserStore";
import { ClientBase } from "./ClientBase";


/**
 * User client
 */

export class UserClient extends ClientBase {
  constructor() {
    super();
  }

  async addUser(data) {
    try {
      return (await this.client.post("/api/users/", data)).data;
    } catch (error) {
      this.handleError(error)
    }
  }

  async login(data) {
    try {
      const response = (await this.client.post("/api/users/login", data)).data;
      getUserStore().setTokensOnLogin(response);
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  async refreshAccessToken(refresh_token) {
    const headers ={
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${refresh_token}`
    }

    try {
      return (await this.refreshClient.post("/api/users/refresh", "", {headers})).data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getUserDetails() {
    try {
      return (await this.client.get("/api/users/detail")).data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getUsers() {
    try {
      return (await this.client.get("/api/users/")).data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getUser(id) {
    try {
      const user = (await this.client.get("/api/users/" + id)).data;
      return user; 
    } catch (error) {
      this.handleError(error);
    }
  }

  async adminChangePassword(userId, newPassword) {
    const data = {
      new_password: newPassword
    }
    try {
      return (await this.client.put(`/api/users/${userId}/password/reset`, data)).data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async changePassword(currentPassword, newPassword) {
    const data = {
      current_password: currentPassword,
      new_password: newPassword
    }
    try {
      return (await this.client.put(`/api/users/password/change`, data)).data;
    } catch (error) {
      this.handleError(error);
    }
  }
  
  async updateUser(user) {
    try {
      await this.client.put("/api/users/" + user.id, user);
    } catch (error) {
      this.handleError(error);
    }
  }    
  
  async deleteUser(id) {
    try {
      return (await this.client.put("/api/users/" + id + "/disable")).data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async activateUser(id) {
    try {
      return (await this.client.put("/api/users/" + id + "/enable")).data;
    } catch (error) {
      this.handleError(error);
    }
  }  
}

export const userClient = new UserClient(); 
