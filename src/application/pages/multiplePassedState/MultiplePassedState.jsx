import React from 'react'
import { observer } from 'mobx-react'
import { Box, Button, Divider, Typography } from '@mui/material'
import { makeObservable, observable } from 'mobx'
import { Store, useGlobalStoreDefinition, useGlobalStore, useStore } from '../../../general/util-mobx-react'
import { pagePadding, columnStyle, rowStyle, hardShadow } from '../../../general/style/style'
import { ComponentCard } from '../../../general/components/ComponentCard';


/**
 * A store used globally
 */
export class GloballyUsedStore extends Store {
  constructor() {
    super();
    this.value = 42;

    makeObservable(this, {
      value: observable
    });
  }
}


/**
 * A store passed to a child. 
 */
export class OuterComponentStore extends Store {
  constructor() {
    super();
    this.value = 42;

    makeObservable(this, {
      value: observable
    });
  }
}


/**
 * A component that passes its store to its children. 
 */
export const OuterComponent = observer(() => {

  useGlobalStoreDefinition(GloballyUsedStore);

  const outerStore = useStore(OuterComponentStore);
  const globalStore = useGlobalStore(GloballyUsedStore);

  return (
    <>
      <Typography style={{width: 200}}>Global store: {globalStore.value}</Typography>
      <ComponentCard style={{...columnStyle}}>
        <Typography variant="h6">OuterComponent</Typography>
        <Typography style={{width: 200}}>Outer store: {outerStore.value}</Typography>
        <IntermediateComponent outerStore={outerStore}/>
      </ComponentCard>
    </>
  );
})



/**
 * A store passed to a child.
 */
export class IntermediateComponentStore extends Store {
  constructor() {
    super();
    this.value = 100;

    makeObservable(this, {
      value: observable
    });
  }
}


/**
 * A component that passes its store to its children. 
 */
const IntermediateComponent = observer(({outerStore}) => {
  const intermediateStore = useStore(IntermediateComponentStore);

  return (
    <ComponentCard style={{boxShadow: hardShadow, padding: pagePadding, ...columnStyle}}>
      <Typography variant="h6">Intermediate component</Typography>
      <Typography style={{width: 200}}>Intermediate store: {intermediateStore.value}</Typography>
      <LeafComponent outerStore={outerStore} intermediateStore={intermediateStore}/>
    </ComponentCard>
  );
})


/**
 * A leaf component 
 */
const LeafComponent = observer(({outerStore, intermediateStore}) => {

  const globalStore = useGlobalStore(GloballyUsedStore);

  return (
    <ComponentCard style={{padding: pagePadding, ...columnStyle}}>
      <Typography variant="h6">Leaf component</Typography>
      <Box style={rowStyle}>
        <Typography style={{width: 200}}>Global store: {globalStore.value}</Typography>
        <Button variant="contained" onClick={() => { globalStore.value += 1; }}>Add one</Button>
      </Box>
      <Divider/>
      <Box style={rowStyle}>
        <Typography style={{width: 200}}>Outer store: {outerStore.value}</Typography>
        <Button variant="contained" onClick={() => { outerStore.value += 1; }}>Add one</Button>
      </Box>
      <Divider/>
      <Box style={rowStyle}>
        <Typography style={{width: 200}}>Intermediate store: {intermediateStore.value}</Typography>
        <Button variant="contained" onClick={() => { intermediateStore.value += 1; }}>Add one</Button>
      </Box>
    </ComponentCard>
  );
});
