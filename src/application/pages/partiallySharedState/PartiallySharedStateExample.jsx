import React from 'react'
import { observer } from 'mobx-react'
import { Alert, Box, Divider } from '@mui/material'
import componentCode from './PartiallySharedState.jsx?raw';
import { CodeSnippet } from '../../../general/components/CodeSnippet'
import { pageMargin, pagePadding, columnStyle } from '../../../general/style/style'
import { PartiallySharedState } from './PartiallySharedState';


/**
 * A component that passes its store to its children. 
 */
export const PartiallySharedStateExample = observer(() => {
  return (
    <>
      <Box style={{
        margin: pageMargin, 
        padding: pagePadding, 
        ...columnStyle}}>
        <Alert severity="success">This demonstrates how you can split a store/state into parts, and pass the parts to child components that only has access to the parts given to them. This is great for information hiding in your design. Note that all components can just modify their corresponding part.</Alert>
        <PartiallySharedState/>
      </Box>
      <Divider/>
      <Box style={{padding: pagePadding}}>
        <CodeSnippet filename="SharingState.jsx" code={componentCode}/>
      </Box>        
    </>
  );
})
