import { action, makeObservable, observable } from "mobx";
import { copyForEdit } from "../../../general/util-mobx-react";
import { Store } from "../../../general/util-mobx-react";

const originalDayMenu = {
  breakfast: "pizza",
  lunch: "pasta",
  supper: "sandwich"
}

export class EditCopyStore extends Store {
  constructor() {
    super();
    this.isLoading = true;
    this.dayMenu = null;
    makeObservable(this, {
      isLoading: observable,
      dayMenu: observable,
      save: action.bound
    })
  }

  onCreated() {
    // Emulate load data
    setTimeout(() => {
      this.isLoading = false; 
      this.dayMenu = copyForEdit(originalDayMenu);  // Note that this assignment happens totally asynchronic from any React rendering. 
    },500);
  }

  async save() {
    // Emulate save data
    this.isLoading = true; 
    this.dayMenu.submit(); // Push changes to original. 
    setTimeout(() => {this.isLoading = false; }, 500)
  }

  revert() { // Note: We did not declare this as an action properly, but it still works. Only difference is that without using action.bound we have to bind the function to this or use an inline function.  
    this.dayMenu.revert();
  }
}  
