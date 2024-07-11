import React from 'react'
import { observer } from 'mobx-react'
import { Alert, Box, Divider } from '@mui/material'
import file from './BasicState?raw';
import { CodeSnippet } from '../../../general/components/CodeSnippet';
import { columnStyle, pageMargin, pagePadding } from '../../../general/style/style';
import { BasicState } from './BasicState';


/**
 * Basic state
 */
export const BasicStateExample = observer(() => {
  return (
    <>
      <Box style={{margin: pageMargin, padding: pagePadding, ...columnStyle}}>
        <Alert severity="success">This demonstrates how you can create a simple sharable state, without using OOP or classes, just using the <b>useObservable()</b> hook. Don't forget to use the <b>observer()</b> function for your components. This can replace the need for React.useState, as it is lightweight, allows direct manipulation of state and is safe for state sharing.</Alert>
        <BasicState/>
        <Alert severity='info'>Follow instructions on the console, on how to direct manipulate state from outside the app</Alert>
      </Box>
      <Divider/>
      <Box style={{padding: pagePadding}}>
        <CodeSnippet filename={"BasicState.jsx"} code={file}/>
      </Box>
    </>
  );
});
