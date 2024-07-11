import { Alert, Box, Divider } from "@mui/material";
import { ComponentWithStoreStore } from "./ComponentWithStoreStore";
import { observer } from "mobx-react";
import componentCode from './ComponentWithStore.jsx?raw';
import storeCode from './ComponentWithStoreStore.js?raw';
import { useStore } from "../../../general/util-mobx-react";
import { CodeSnippet } from "../../../general/components/CodeSnippet";
import { pageMargin, pagePadding, columnStyle } from "../../../general/style/style";
import { ComponentWithStore } from "./ComponentWithStore";

export const ComponentWithStoreExample = observer(() => {
  const store = useStore(ComponentWithStoreStore);
  console.log(store);

  return (
    <>
      <Box style={{...columnStyle, margin: pageMargin, padding: pagePadding}}>
        <Alert severity="success">It convenient to use a class to define the store of your component, just use it with the <b>useStore</b> hook . Within your class constructor you use <b>makeObservable</b> to make properties observable, or create bound actions or computed functions</Alert>
        <ComponentWithStore/>
      </Box>

      <Divider/>
      <Box style={{padding: pagePadding}}>
        <CodeSnippet filename="ComponentWithStore.jsx" code={componentCode}/>
        <CodeSnippet filename="ComponentWithStoreStore.js" code={storeCode}/>
      </Box>
    </>
  );
})