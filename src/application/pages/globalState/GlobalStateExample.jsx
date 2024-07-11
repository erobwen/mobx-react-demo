import React from 'react'
import { observer } from 'mobx-react'
import { Alert, Box, Divider } from '@mui/material'
import componentCode from './GlobalState.jsx?raw';
import { CodeSnippet } from '../../../general/components/CodeSnippet'
import { pageMargin, pagePadding, columnStyle } from '../../../general/style/style'
import { GlobalState } from './GlobalState';


export const GlobalStateExample = observer(() => {
  return (
    <>
      <Box style={{
        margin: pageMargin, 
        padding: pagePadding,
        ...columnStyle}}>
        <Alert severity="success">You can either create global state using an exported module consts and <b>observable()</b>, or using the <b>useGlobalStoreDefinition()</b> hook to define a global store with a class, and then <b>useGlobalStore()</b> to use it.</Alert>
        <Alert severity="info">Note that if you use the useGlobalStoreDefinition hook, the store will not be created until the hook is rendered the first time.</Alert>
        <GlobalState/>
      </Box>
      <Divider/>
      <Box style={{padding: pagePadding}}>
        <CodeSnippet filename="SharingState.jsx" code={componentCode}/>
      </Box>        
    </>
  );
})
