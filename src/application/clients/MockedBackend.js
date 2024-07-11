import { sleep } from "../../general/util-mobx-react/utility";

export class MockedBackend {
  async get(url) {
    return this.getResponse("get", url);
  }

  async put(url) {
    return this.getResponse("put", url);
  }

  async post(url) {
    return this.getResponse("post", url);
  }

  async delete(url) {
    return this.getResponse("delete", url);
  }

  async getResponse(method, url) {
    await sleep(500);
    const urlFragments = url.split("/");

    const endpoint = endpoints.find(endpoint => {
      if (method !== endpoint.method) return false; 
      const endpointFragments = endpoint.url.split('/');

      if (urlFragments.length !== endpointFragments.length) {
        return false; 
      }

      let index = 0;
      while(index < urlFragments.length) { 
        if (endpointFragments[index] !== "*" && endpointFragments[index] !== urlFragments[index]) {
          return false; 
        }

        index++;
      }
      return true; 
    });

    return {data: endpoint.response};
  }
}

const endpoints = [
  {
    name: "addUser",
    method: "post",
    url: "/api/users/",
    response: {
      "active": 1,
      "email": "user@test.com",
      "id": 4,
      "name": "test test",
      "roles": [],
      "username": ""
    }
  },
  {
    name: "login",
    method: "post",
    url: "/api/users/login",
    response: {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxfQ.bUGL1u26YQkSVPk3e4NtymYPTh5K9YhXGLgzDoYKfoE",
      "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxfQ.bUGL1u26YQkSVPk3e4NtymYPTh5K9YhXGLgzDoYKfoE"
    }
  },
  {
    name: "refreshAccessToken",
    method: "post",
    url: "/api/users/refresh",
    response: {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxfQ.bUGL1u26YQkSVPk3e4NtymYPTh5K9YhXGLgzDoYKfoE",
      "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxfQ.bUGL1u26YQkSVPk3e4NtymYPTh5K9YhXGLgzDoYKfoE"
    }
  },
  {
    name: "getUserDetails",
    method: "get",
    url: "/api/users/detail",
    response: {
      "active": 1,
      "email": "user@test.com",
      "id": 4,
      "name": "test test",
      "roles": ["admin"],
      "username": "test"
    }
  },
  {
    name: "getUsers",
    method: "get",
    url: "/api/users/",
    response: [
      {
          "active": 1,
          "email": "admin@test.com",
          "id": 1,
          "name": "admin",
          "username": "admin"
      },
      {
          "active": 1,
          "email": "user1@test.com",
          "id": 2,
          "name": "user1",
          "username": "user1"
      },
      {
          "active": 1,
          "email": "user2@test.com",
          "id": 3,
          "name": "user2",
          "username": "user2"
      },
      {
          "active": 1,
          "email": "user@test.com",
          "id": 4,
          "name": "test test",
          "username": "test"
      }
    ]
  },
  {
    name: "getUser",
    method: "get",
    url: "/api/users/*",
    response: {
      "active": 1,
      "email": "user1@test.com",
      "id": 2,
      "name": "user1",
      "roles": [
          "testProxy"
      ],
      "username": "user1"
    }
  },
  {
    name: "adminChangePassword",
    method: "put",
    url: "/api/users/*/password/reset",
    response: "success"
  },
  {
    name: "changePassword",
    method: "put",
    url: "/api/users/password/change",
    response: "success"
  },
  {
    name: "updateUser",
    method: "put",
    url: "/api/users/*",
    response: "success"
  },
  {
    name: "deleteUser",
    method: "delete",
    url: "/api/users/*",
    response: "success"
  },
  {
    name: "getRoles",
    method: "get",
    url: "/api/roles/",
    response: [
      {
          "description": "admin Role with all permissions",
          "id": 1,
          "name": "admin"
      },
      {
          "description": "proxy Role with all permissions",
          "id": 2,
          "name": "testProxy"
      },
      {
          "description": "UnitTestUser Role with all permissions",
          "id": 3,
          "name": "UnitTestUser"
      },
      {
          "description": "UnitTestUser Role with all permissions",
          "id": 4,
          "name": "UnitTestUserForDelete"
      }
    ]
  }
]