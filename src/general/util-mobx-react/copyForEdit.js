import { makeObservable, observable, reaction } from "mobx";
import { useState } from "react";

/**
 * Copy for edit is a design pattern useful for setting up auto-save and detecting
 *  when an item needs saving. It creates change detection in all properties in 
 * the initial values object given to the constructor. 
 * 
 * Beware: Does not work well with computed properties on the original. 
 */
export class CopyForEdit {
  
  constructor(original) {
    if (original instanceof Array) throw new Error("Arrays are not supported!");
    this._original = original;

    this._hasChanged = false; 
    synch(this, this._original);

    const observableProperties = {};
    Object.keys(original).map(key => observableProperties[key] = observable);
    observableProperties["_hasChanged"] = observable;
    makeObservable(this, observableProperties);
    this.startTracking();
  }

  submit() {
    // TODO: copy back deep to maintain original sub object identities. 
    synch(this._original, this);
    // Object.keys(this._original).map(key => this._original[key] = this[key]);
    this._hasChanged = false;
  }

  revert() {
    Object.assign(this, this._original);
    this._hasChanged = false; 
  }

  startTracking() {
    this._disposeTrackerReaction = reaction(() => {
      return deepClone(this);; 
    }, 
    (clone) => {
      this._hasChanged = !deepMatch(this._original, clone); 
    }, 
    {fireImmediately: false})
  }

  hasChanged() {
    return this._hasChanged;
  }
}


/**
 * Create a copy
 */
export function copyForEdit(object) {
  if (object === null) return null;
  return new CopyForEdit(object);
}


/**
 * Helper for attaching a mobx store to your react app.  
 */
export function useCopyForEdit(original) {
  const [copyHolder, _] = useState({copy: null, copied: null})

  if (!copyHolder.copy || copyHolder.copied !== original) {
    copyHolder.copied = original;
    copyHolder.copy = copyForEdit(original);
  }

  return copyHolder.copy;
} 


/**
 * Deep object structure match, that will ignore properties starting with _ 
 */
export function deepMatch(a, b) { 
  if (typeof(a) === "function" || typeof(b) === "function") return true; // Dont compare functions! 
  if (typeof(a) !== typeof(b)) return false; 
  if ((a instanceof Array) !== (b instanceof Array)) return false; 

  if (a instanceof Array) {
    if (a.length !== b.length) return false;
    let index = 0; 
    while (index < a.length) {
      if (!deepMatch(a[index], b[index])) {
        return false;
      }
      index++; 
    }
    return true; 
  }
  
  if (typeof(a) === "object") {
    if (actualKeys(a).length !== actualKeys(b).length) { 
      return false;
    }
    for (let prop in a) if (!prop.startsWith('_')) {
      if (!deepMatch(a[prop], b[prop])) {
        return false; 
      }
    }
    return true; 
  }

  return a === b; 
}

function actualKeys(object) {
  return Object.keys(object).filter(key => !key.startsWith('_'));
}


/**
 * Deep object structure clone, that will ignore properties starting with _ 
 */
export function deepClone(object) {
  if (object instanceof Array) {
    const clone = [];
    object.map(item => clone.push(deepClone(item)))
    return clone;  
  }

  if (typeof(object) === "object" && object !== null) {
    const clone= {}
    for (let key in object) {
      if (!key.startsWith("_")) {
        clone[key] = deepClone(object[key]);
      }
    }
    return clone;
  }
  return object; 
}


/**
 * Similar to Object.assign(target, source), with important differences: 
 * 
 * It ignores any property starting with _
 * It tries to reuse objects when possible, to maintain object identity. Reuse cannot be achieved inside arrays.
 * 
 * Example, so after these operations. 
 * 
 * const target = {foo: {bar: 1}};
 * const fooObject = target.foo; 
 * synch(target, {foo: {bar: 2}};
 * 
 * // fooObject === target.foo will still be true! 
 * // target.foo.bar === 2 will be true. 
 * 
 * Defaults to cloning if objects cannot be reused. 
 */
export function synch(target, source, config) {

  if (typeof(target) === typeof(source) && target !== null && source !== null) {

    if (target instanceof Array && source instanceof Array) {
      // Note: We cannot maintain object identity of any item inside an array! 
      target.length = 0;
      source.forEach(item => target.push(deepClone(item)));
      return target; // Reuse target for maintained object identity.
    }

    if (typeof(target) === "object") {
      actualKeys(source).forEach(property => {
        if (typeof(target[property]) !== "undefined" || !config || !config.dontAddProperties) {
          target[property] = synch(target[property], source[property], config)
        }
      });

      actualKeys(target).forEach(property => {
        if (typeof(source[property]) === "undefined") {
          delete target[property];
        }
      });

      return target;  // Reuse target for maintained object identity.
    }
  } 

  return deepClone(source); 
}