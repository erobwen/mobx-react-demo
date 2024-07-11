import { IconButton, Snackbar } from "@mui/material"
import ContentCopy from '@mui/icons-material/ContentCopy';
import { useState } from "react";

const CopyToClipboardButton = ({message, toCopy}) => {
  const [open, setOpen] = useState(false);
  if (!navigator.clipboard) return null;
  const handleClick = () => {
    setOpen(true)
    navigator.clipboard.writeText(toCopy)
  }
  
  return (
    <>
      <IconButton onClick={handleClick}>
        <ContentCopy/>
      </IconButton>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
        message={message}
      />
    </>
  )
}

export default CopyToClipboardButton