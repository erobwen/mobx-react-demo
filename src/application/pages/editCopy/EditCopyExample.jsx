import { Alert, Box, Divider } from "@mui/material";
import { observer } from "mobx-react";
import componentCode from './EditCopy.jsx?raw';
import storeCode from './EditCopyStore.js?raw';
import { CodeSnippet } from "../../../general/components/CodeSnippet";
import { pageMargin, pagePadding } from "../../../general/style/style";
import { formBoxStyle } from "../../../general/components/StyledCard";
import { EditCopy } from "./EditCopy";


export const EditCopyExample = observer(() => {
  return (
    <>
      <Box style={{margin: pageMargin, padding: pagePadding, ...formBoxStyle}}>
        <Alert severity="success">It is often the case you want to edit data from the server, and once changed, send save it. <b>copyForEdit()</b> or the hook <b>useCopyForEdit()</b> in <b>util-mobx-react</b> supports this by creating an observed copy of an object or data structure, that supports a number of convenience methods, such as <b>.commit()</b>, <b>.revert()</b> etc. Changes made to the copy are automatically tracked, so it is super easy to know if there is anything to save at all, using <b>.hasChanged()</b>.</Alert>
        <Alert severity="info">For an even leaner design, you can use <b>useCopyForEdit()</b> directly in a dialog that edits certain data, without even the need for a store. </Alert>
        <EditCopy/>
      </Box>
      
      <Divider/>
      <Box style={{padding: pagePadding}}>
        <CodeSnippet filename="EditCopy.jsx" code={componentCode}/>
        <CodeSnippet filename="EditCopyStore.js" code={storeCode}/>
      </Box>
    </>
  );
})
