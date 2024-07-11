import { Alert, Box, Divider } from "@mui/material";
import { observer } from "mobx-react";
import componentCode from './DataLoading.jsx?raw';
import storeCode from './DataLoadingStore.js?raw';
import { CodeSnippet } from "../../../general/components/CodeSnippet";
import { columnStyle, pageMargin, pagePadding } from "../../../general/style/style";
import { DataLoading } from "./DataLoading";

export const DataLoadingExample = observer(() => {
  return (
    <>
      <Box style={{margin: pageMargin, padding: pagePadding, ...columnStyle}}>
        <Alert severity="success">Since MobX can respond to any asynchronous change in observed data, without even the need for actions etc, it is super easy to integrate with data loading. The client code can do the loading using <b>async/await</b>, and observed data is simply updated when finished.</Alert>
        <DataLoading/>
      </Box>
      <Divider/>
      <Box style={{padding: pagePadding}}>
        <CodeSnippet filename="DataLoading.jsx" code={componentCode}/>
        <CodeSnippet filename="DataLoadingStore.js" code={storeCode}/>
      </Box>
    </>
  );
})