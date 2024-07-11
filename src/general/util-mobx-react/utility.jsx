import { untracked } from "mobx";

/**
 * Helper log, this one is useful in MobX development for the following reasons. 
 * 
 * 1. It is shorter to write "log" instead of "console.log" (if you use auto-import),
 * 2. This method do not create additional data dependencies that might confuse your debugging. Using 
 *    basic console.log may actually change your data dependencies, and cause very subtle bugs that are hard to solve.
 * 3. It returns the logged value, so you can add it quickly inside expressions without having to 
 *    create additional variables.  
 * 4. You can send functions to it, that will get the logged value in untracked mode. Like this. log(() => some.data.I.dont.want.to.observe)
 * 
 * Howver it has one big drawback. When you click on a printout in the web browser, you will be lead 
 * here instead of the code that did the printout. So despite all this, console.log is sometimes to prefer over log. 
 */

export function log(...argumentList) {
  const noArgument = argumentList.length === 0;
  let value; 
  if (noArgument) {
    value = "-----------------------------------------------------------------";
  } else {
    let [ valueOrFunction ]  = argumentList;
  
    // Create value if function
    if (typeof(valueOrFunction) === "function") {
      value = untracked(valueOrFunction());
    } else {
      value = valueOrFunction;
    }
  }

  // Unpack value inside any proxy that wont look good on the browser console.
  untracked(() => {
    if (value instanceof Array) value = [...value]
    if (typeof(value) === "object") value = {...value}
  })
  
  untracked(() => console.log(value));
  return value;
}

Array.prototype.remove = function(target) {
  const index = this.findIndex((element) => {
    return element === target;
  });
  if (index >= 0) {
    this.splice(index, 1);
    return true;
  } else {
    return false; 
  }
}



export function setDifferenceArray(originalArray, newArray) {
  const result = {
    added: [],
    removed: []
  }

  originalArray.forEach(item => {
    if (!newArray.includes(item)) {
      result.removed.push(item);
    }
  });

  newArray.forEach(item => {
    if (!originalArray.includes(item)) {
      result.added.push(item);
    }
  })

  return result; 
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}