import React, { useContext, createContext } from 'react'
import { observer } from 'mobx-react'
import { Box, Button, Typography } from '@mui/material'
import { makeObservable, observable } from 'mobx'
import { useStore } from '../../../general/util-mobx-react'
import { pagePadding, columnStyle, rowStyle } from '../../../general/style/style'
import { Store } from '../../../general/util-mobx-react'
import { ComponentCard } from '../../../general/components/ComponentCard'

// Create a react context as one option to distribute state. 
const StateContext = createContext(null);

/**
 * Store that contextually inherited
 */
class ContextualStateInheritanceStore extends Store {
  constructor() {
    super();
    this.value = 42;
    makeObservable(this, {
      value: observable
    });
  }
}

/**
 * Component that provides a store through a context
 */
export const ContextualStateInheritance = observer(() => {

  const store = useStore(ContextualStateInheritanceStore);
  
  return (
    <StateContext.Provider value={store}>
      <Box style={{...columnStyle}}>
        <Typography>Context state value is: {store.value}</Typography>
        <Far/>
      </Box> 
    </StateContext.Provider>
  );
})


/**
 * Component structure that inherits the store.
 */
const Far = () => <Down/>

const Down = () => <In/>

const In = () => <The/>

const The = () => <Hierarchy/>

const Hierarchy = observer(() => {
  const store = useContext(StateContext);
  return (
    <ComponentCard style={{padding: pagePadding, ...columnStyle}}>
      <Box style={rowStyle}>
        <Typography>Context state value is: {store.value}</Typography>
        <Button variant="contained" onClick={() => { store.value += 1; }}>Add one</Button>
      </Box>
    </ComponentCard>
  );
})