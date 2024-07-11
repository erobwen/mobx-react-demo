import React from 'react'
import { observer } from 'mobx-react'
import { Box, Button, Divider, Typography } from '@mui/material'
import { makeObservable, observable } from 'mobx'
import { Store, useStore } from '../../../general/util-mobx-react'
import { pagePadding, columnStyle, rowStyle, hardShadow } from '../../../general/style/style'
import { ComponentCard } from '../../../general/components/ComponentCard';


/**
 * Outer component
 */
export const OuterComponent = observer(() => {
  return (
    <>
      <ComponentCard style={{...columnStyle}}>
        <Typography variant="h6">OuterComponent</Typography>
        <IntermediateComponent/>
        <IntermediateComponent/>
      </ComponentCard>
    </>
  );
})



/**
 * A store for intermediate component
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
 * An intermediate component that owns its own store, with state and methods. 
 */
const IntermediateComponent = observer(({outerStore}) => {
  const intermediateStore = useStore(IntermediateComponentStore);

  return (
    <ComponentCard style={{boxShadow: hardShadow, padding: pagePadding, ...columnStyle}}>
      <Typography variant="h6">Intermediate component</Typography>
      <Typography style={{width: 200}}>Intermediate store: {intermediateStore.value}</Typography>
      <LeafComponent outerStore={outerStore} intermediateStore={intermediateStore}/>
      <LeafComponent outerStore={outerStore} intermediateStore={intermediateStore}/>
      <LeafComponent outerStore={outerStore} intermediateStore={intermediateStore}/>
    </ComponentCard>
  );
})


/**
 * A leaf component 
 */
const LeafComponent = observer(({outerStore, intermediateStore}) => {

  return (
    <ComponentCard style={{padding: pagePadding, ...columnStyle}}>
      <Typography variant="h6">Leaf component</Typography>
      <Box style={rowStyle}>
        <Typography style={{width: 200}}>Intermediate store: {intermediateStore.value}</Typography>
        <Button variant="contained" onClick={() => { intermediateStore.value += 1; }}>Add one</Button>
      </Box>
    </ComponentCard>
  );
});
