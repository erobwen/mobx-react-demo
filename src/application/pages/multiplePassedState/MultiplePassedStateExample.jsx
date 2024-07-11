import React from 'react'
import { observer } from 'mobx-react'
import { Alert, Box, Divider } from '@mui/material'
import componentCode from './MultiplePassedState.jsx?raw';
import { CodeSnippet } from '../../../general/components/CodeSnippet'
import { pageMargin, pagePadding, columnStyle } from '../../../general/style/style'
import { OuterComponent } from './MultiplePassedState';

/**
 * A component that passes its store to its children. 
 */
export const MultiplePassedStateExample = observer(() => {
  return (
    <>
      <Box style={{
        margin: pageMargin, 
        padding: pagePadding, 
        ...columnStyle}}>
        <Alert severity="success">This setup demonstrates how multiple component stores and a global store can be passed to a leaf component that uses all of them.</Alert>
        <Alert severity="info">Since stores are owned by components in MobX, it is not a problem that there are several instances of the intermediate component that have different states. </Alert>
        <OuterComponent/>
      </Box>
      <Divider/>
      <Box style={{padding: pagePadding}}>
        <CodeSnippet filename="SharingState.jsx" code={componentCode}/>
      </Box>        
    </>
  );
})


