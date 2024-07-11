import { observer } from 'mobx-react'
import { Alert, Box, Divider } from '@mui/material'
import { CodeSnippet } from '../../../general/components/CodeSnippet'
import { pageMargin, pagePadding, columnStyle } from '../../../general/style/style'
import componentCode from './ContextualStateInheritance.jsx?raw';
import { ContextualStateInheritance } from './ContextualStateInheritance'


export const ContextualStateInheritanceExample = observer(() => {

  return (
    <>
      <Box style={{margin: pageMargin, padding: pagePadding, ...columnStyle}}>
        <Alert severity="success">Using <b>React.createContext()</b> to distribute state transparently to any grand child works also, but do you really need to given the new options? It is now super easy to create lightweight state at any level, you can split state into parts and distribute just parts to children via React parameters, and you can easily have global state imported as modules or using the useGlobalState hook. So do we really need this?</Alert>
        <ContextualStateInheritance/>
      </Box>
      <Divider/>
      <Box style={{padding: pagePadding}}>
        <CodeSnippet filename="SharingState.jsx" code={componentCode}/>
      </Box> 
    </>
  );
})
