import React from 'react'
import { observer } from 'mobx-react'
import { Alert, Box, Divider } from '@mui/material'
import componentCode from './IntermediateState.jsx?raw';
import { CodeSnippet } from '../../../general/components/CodeSnippet'
import { pageMargin, pagePadding, columnStyle } from '../../../general/style/style'
import { OuterComponent } from './IntermediateState';

/**
 * A component that passes its store to its children. 
 */
export const IntermediateStateExample = observer(() => {
  return (
    <>
      <Box style={{
        margin: pageMargin, 
        padding: pagePadding, 
        ...columnStyle}}>
        <Alert severity="success">This setup demonstrates how an intermediate component can own its own store that is accessible to all children. This can for example be useful if we build a multi-window environment where a window owns it own store, and multiple instances of such window can co-exist on the same screen.</Alert>
        <OuterComponent/>
      </Box>
      <Divider/>
      <Box style={{padding: pagePadding}}>
        <CodeSnippet filename="SharingState.jsx" code={componentCode}/>
      </Box>        
    </>
  );
})


