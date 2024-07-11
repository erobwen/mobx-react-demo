/**
 * Global user store
 */
let userStore;


/**
 * Convenience methods to get global stores and their information anywhere
 */
export function setUserStore(newUserStore) {
  if (userStore) throw new Error("Should only be one user store in your application!");
  userStore = newUserStore;
}

export function getUserStore() {
  if (!userStore) throw new Error("User store not created yet!");
  return userStore;
}

export function tryNavigateToLogin() {
  if (getUserStore()) {
    getUserStore().logout();
  }
}

export function getUser() {
  return getUserStore().user;
}

export function loggedIn() {
  return !!getUserStore().tokens;
}
