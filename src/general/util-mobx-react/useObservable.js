import { observable } from "mobx";
import { useState } from "react";

/**
 * Helper for creating an observable in your react app. 
 */
export function useObservable(createState) {
  if (typeof(createState) !== "function") {
    throw new Error("MobX state cannot be created directly on render, it needs to be created in a function that you send to useObservable.");
  }

  const [state, _] = useState({value: null});
  if (!state.value) {
    state.value = observable(createState());
  }
  return state.value;
}
