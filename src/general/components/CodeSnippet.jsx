import { Typography } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vs from 'react-syntax-highlighter/dist/esm/styles/prism/vs';

export const CodeSnippet = ({filename, code}) => {
  return (
    <>
      {/* <Typography>{filename}</Typography> */}
      <SyntaxHighlighter showLineNumbers wrapLongLines language="javascript" style={vs}>
        {code}
      </SyntaxHighlighter>
    </>
  );
};
