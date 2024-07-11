import { action, computed, makeObservable, observable } from "mobx";
import { Store } from "../../../general/util-mobx-react";

export class ComponentWithStoreStore extends Store {
  constructor() {
    super();
    this.valueA = 0;
    this.valueB = 0; 

    makeObservable(this, {
      valueA: observable,
      valueB: observable, 
      product: computed,
      incrementAll: action.bound
    })
  }

  get product() {
    // This will only be reevaluated if either valueA or valueB change. Very handy if it is an expensive operation.  
    return this.valueA * this.valueB;
  }

  incrementAll() {
    this.valueA += 1;
    this.valueB += 1;
  }
};  