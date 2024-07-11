import React from 'react'
import { observer } from 'mobx-react'
import { Alert, Box, Button, Card, Divider, Typography } from '@mui/material'
import { makeObservable, observable } from 'mobx'
import componentCode from './ReactiveForm.jsx?raw';
import { CodeSnippet } from '../../../general/components/CodeSnippet'
import { Store, useGlobalStoreDefinition, useGlobalStore, useObservable, useStore } from '../../../general/util-mobx-react'
import { pageMargin, pagePadding, columnStyle, rowStyle, hardShadow } from '../../../general/style/style'
import { ComponentCard } from '../../../general/components/ComponentCard';
import { ReactiveForm } from './ReactiveForm';


/**
 * A component that passes its store to its children. 
 */
export const ReactiveFormExample = observer(() => {
  return (
    <>
      <Box style={{
        margin: pageMargin, 
        padding: pagePadding, 
        ...columnStyle}}>
        <Alert severity="success">This demonstrates a reactive form that changes the visibility of selectors and inputs, based on previous choice. It also load available choices only when needed.</Alert>
        <ComponentCard style={{...columnStyle}}>
          <ReactiveForm/>
        </ComponentCard>
      </Box>
      <Divider/>
      <Box style={{padding: pagePadding}}>
        <CodeSnippet filename="SharingState.jsx" code={componentCode}/>
      </Box>        
    </>
  );
})

