import React from 'react'
import { observer } from 'mobx-react'
import { Box, Button, Divider, Typography } from '@mui/material'
import { useObservable } from '../../../general/util-mobx-react';
import { rowStyle } from '../../../general/style/style';
import { ComponentCard } from '../../../general/components/ComponentCard';


/**
 * Basic state
 */
export const BasicState = observer(() => {

  const state = useObservable(() => (
    { 
      value: 1, 
      partial: { 
        value: 1
      }
    }
  ));
  
  console.log('Right click object below and choose "Store as global variable" that will \
  typically store it as temp1. Then try direct manipulate it, for example by typing "temp1.value = 42"');
  console.log(state);

  return (
    <ComponentCard>      
      <Box style={rowStyle}>
        <Typography style={{width: 200}}>Current value is: {state.value}</Typography>
        <Button variant="contained" onClick={() => { state.value += 1; }}>Add one</Button>
      </Box>
      
      <Divider/>

      <Box style={rowStyle}>
        <Typography style={{width: 200}}>Partial state value is: {state.partial.value}</Typography>
        <Button variant="contained" onClick={() => { state.partial.value += 1; }}>Add one</Button>
      </Box>
    </ComponentCard>
  );
});

