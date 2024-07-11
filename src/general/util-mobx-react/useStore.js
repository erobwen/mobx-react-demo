import { useEffect, useState } from "react";


/**
 * Helper for attaching a mobx store to your react component.
 */
export function useStore(Class, arglistOrValues=[]) {
  const arglist = (arglistOrValues instanceof Array) ? arglistOrValues : null;
  const values = arglist ? null : arglistOrValues;
  if (typeof(Class) !== "function") {
    throw new Error("Need a class");
  }

  const [storeHolder, _] = useState({ store: null });

  const firstTime = !storeHolder.store; 

  if (firstTime) {
    if (arglist) storeHolder.store = new Class(...arglist); 
    if (values) storeHolder.store = new Class(values);
    storeHolder.store._lastArglistOrValues = arglistOrValues;
  }

  return commonUseStore(storeHolder.store, arglistOrValues, firstTime);
}


/**
 * Use global store
 */
const globalStores = {};

export function getGlobalStore(ClassName) {
  if (!globalStores[ClassName.name]) throw new Error("Global store does not exist!");
  return globalStores[ClassName.name]; 
}

export function useGlobalStoreDefinition(Class, arglistOrValues=[]) {
  const arglist = (arglistOrValues instanceof Array) ? arglistOrValues : null;
  const values = arglist ? null : arglistOrValues;

  const firstTime = !globalStores[Class.name]; 

  if (firstTime) {
    if (arglist) globalStores[Class.name] = new Class(...arglist); 
    if (values) globalStores[Class.name] = new Class(values);
    globalStores[Class.name]._lastArglistOrValues = arglistOrValues;
  }

  commonUseStore(globalStores[Class.name], arglistOrValues, firstTime);
}

export function useGlobalStore(Class) {
  if (!globalStores[Class.name]) {
    throw new Error("Global store not created yet!");
  }
  return globalStores[Class.name];
}


/**
 * Common code shared between useStore and useGlobalStoreDefinition. 
 * 
 * Note: 
 * Store.useHooks runs before Store.onCreated, to allow for usage of hook return values in onCreated.
 */
function commonUseStore(store, arglistOrValues, firstTime) { 
  const arglist = (arglistOrValues instanceof Array) ? arglistOrValues : null;
  const values = arglist ? null : arglistOrValues;

  store.useHooks();
  
  if (firstTime) {
    if (typeof(store.onCreated) === "function") store.onCreated();
  }

  const dependencyList = getDependencyList(arglistOrValues);
  const lastDependencyList = getDependencyList(store._lastArglistOrValues);

  useEffect(() => {
    if (!sameDependencies(dependencyList, lastDependencyList)) {
      store._lastArglistOrValues = arglistOrValues;
      if (arglist) store.updateConstructorArguments(...arglist);
      if (values) store.updateConstructorArguments(values);
    }
    return () => { if (store.onDispose) store.onDispose(); }
  }, dependencyList)

  return store;
}

function getDependencyList(arglistOrValues) {
  if (arglistOrValues instanceof Array) {
    return arglistOrValues; 
  } else {
    const list = [];
    for (let property in arglistOrValues) {
      list.push(property);
      list.push(arglistOrValues[property]);
    }
    return list;
  }
}

function sameDependencies(listA, listB) {
  if (listA === null && listB === null) return true; 
  if (listA === null || listB === null) return false;
  if (typeof(listA) !== typeof(listB)) return false; 
  if (!(listA instanceof Array)) return false; 
  if (listA.length !== listB.length) return false;
  
  let index = 0;
  while (index < listA.length) {
    if (listA[index] !== listB[index]) {
      return false;
    }
    index++;
  }

  return true;
}

