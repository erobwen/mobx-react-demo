/**
 * Warning: It is ok to save properties given by parent as observable properties of the store for easy access
 * however dont do that if the property is a callback! Callbacks often change identity much more often than 
 * regular properties (if the parent component uses an inline function), and it might cause an infinite loop.   
 */
export class Store {
    // Follow this pattern for your constructor. 
    // constructor() {
    //   this.yourObservableProperty = null;
    //   makeObservable(this, {
    //     yourObservableProperty: observable
    //   })
    // }
    constructor(values) {
      this._lastArglistOrValues = null; // Used by hook implementation. 
      // Note: This will run only once on mount
      if (values) {
        if (values instanceof Array) throw new Error("The default implementation of Store.constructor assumes one single object with values instead of an arglist"); 
        Object.assign(this, values);
      }
    }
  
    useHooks() {
      // Note: useHooks runs on every render of the component that uses the store. It runs after constructor, but before onCreated. 
      // You can use hooks and then pass the results to the store through its parameters, but if you only use it inside the store,
      // It might be more convenient to use hooks directly inside the store in this method.  
    }

    onCreated() {
      // Note: This will run only once on mount
      // Load data from api etc. 
    }

    onDispose() {
      // Cleanup external resources.

      // Consider: Can this be supported anymore with functional React. useEffect has a cleanup, but useEffect is not guaranteed
      // To run only once, especially not in React.StrictMode. This function might be called too much! 
      // If it turns out that we simply cannot know when a react component unmounts, then the solution should be to
      // Add MobX synched routing, and have store loading depend on routing instead of component mounting/unmounting. 
    }
  
    updateConstructorArguments(values) {
      // Data given through the constructor might change, so respond to it in this function, 
      // the arglist of this method will match that of the constructor.
      // If you do not use arglist when creating a store, you do not need to implement this. 

      // Default implementation that assumes that your arglist is just a values object.
      if (values instanceof Array) throw new Error("The default implementation of updateConstructorArguments assumes one single object with values instead of an arglist"); 
      Object.assign(this, values);
    }
  }