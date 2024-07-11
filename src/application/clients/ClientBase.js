
import axios from "axios";
import { MockedBackend } from "./MockedBackend";
import { getUserStore, tryNavigateToLogin } from "../stores/getUserStore";

export class ClientBase {
  constructor() {
    this.setupMockClients();
    // this.setupClients();
  }

  setupMockClients() {
    this.client = new MockedBackend();
    this.refreshClient = this.client; 
  }
  
  setupClients() {
    this.refreshClient = axios.create({
      crossdomain: true,
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.client = axios.create({
      crossdomain: true,
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.client.interceptors.request.use(
      request => {
        if (getUserStore().tokens) {
          request.headers['Authorization'] = `Bearer ${getUserStore().tokens.token}`;
        }
        if (request.data) {
          request.data = JSON.stringify(request.data);
        } 

        // console.log('Request:', JSON.stringify(request, null, 2))
        return request;
      },
      error => {
        return Promise.reject(error);
      }
    );
    
    this.client.interceptors.response.use(response => {
      // console.log('Response:', JSON.stringify(response, null, 2))
      return response
    })
  }
  
  handleError(error) {
    if (error && error.response && [403, 401].includes(error.response.status)) tryNavigateToLogin();

    let message;

    if (!message && error.response && error.response.data && typeof(error.response.data.error) === "object") {
      message = "";
      const errorObject = error.response.data.error;

      const properties = Object.keys(errorObject);
      let index = 0; 
      while(index < properties.length) {
        const property = properties[index];
        message += errorObject[property];
        index++;
        if (index < properties.length) message += ", ";
      }
    }
    if (!message && error.response && error.response.data && typeof(error.response.data.error) === "string") message = error.response.data.error;
    if (!message && error.response && error.response.data && error.response.data.message) message = error.response.data.message;
    if (!message && error.response) message = error.response.statusText;
    throw new Error(message);
  }
}