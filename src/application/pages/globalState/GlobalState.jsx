import React from 'react'
import { observer } from 'mobx-react'
import { Box, Button, Divider, Typography } from '@mui/material'
import { makeObservable, observable } from 'mobx'
import { Store, useGlobalStoreDefinition, useGlobalStore, getGlobalStore } from '../../../general/util-mobx-react'
import { rowStyle } from '../../../general/style/style'
import { ComponentCard } from '../../../general/components/ComponentCard';


/**
 * A simple global observable.
 */
export const globalState = observable({
  value: 100
})


/**
 * A store that is used as a global store.
 */
export class StateStore extends Store {
  constructor() {
    super();
    this.value = 200;

    makeObservable(this, {
      value: observable
    });
  }
}


/**
 * A component that initializes global state on first render.   
 */
export const GlobalState = observer(() => {

  useGlobalStoreDefinition(StateStore);

  return (
    <>
      <Typography style={{width: 200}}>Global state: { globalState.value}</Typography>
      <Typography style={{width: 200}}>Global store: { getGlobalStore(StateStore).value}</Typography>
      <SubComponent name="Subcomponent A"/>
      <SubComponent name="Subcomponent B"/>
    </>
  );
})


/**
 *  Sub component
 */
const SubComponent = observer(({name}) => {
  const store = useGlobalStore(StateStore);

  return (
    <ComponentCard>
      <Typography>{name}</Typography>
      <Divider/>
        <Box style={rowStyle}>
          <Typography style={{width: 200}}>Global state: { globalState.value}</Typography>
          <Button variant="contained" onClick={() => { globalState.value += 1; }}>Add one</Button>
        </Box>
      <Divider/>
      <Box style={rowStyle}>
        <Typography style={{width: 200}}>Global store: {store.value}</Typography>
        <Button variant="contained" onClick={() => { store.value += 1; }}>Add one</Button>
      </Box>
    </ComponentCard>
  );
})
