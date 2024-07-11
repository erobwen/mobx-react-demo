import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { Alert, Typography } from '@mui/material';
import { LoadingSpinner } from './StyledCard';
import CopyToClipboardButton from './CopyToClipboardButton';


export const ConfirmationDialog = ({ onOk, loading, onCancel, open, message, ...other }) => {
  return (
    <Dialog
      PaperProps={{style: { width: '80%', maxHeight: 435 }}}
      maxWidth="xs"
      // TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Confirm</DialogTitle>
      {
        loading ? 
          <LoadingSpinner/>
          :
          <>
            <DialogContent dividers>
              <Typography>
                {message}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={onCancel}>
                Cancel
              </Button>
              <Button onClick={onOk}>Ok</Button>
            </DialogActions>
          </>
      }
    </Dialog>
  );
}


export const InformationDialog = ({ onOk, title="Information", copyToClipboard, copyToClipboardMessage, loading, severity, open, message, children, ...other }) => {
  if (children && message) throw new Error("Cannot have both a message and children!");
  return (
    <Dialog
      PaperProps={{style: { width: '80%', maxHeight: 435 }}}
      maxWidth="xs"
      // TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle style={{display:"flex", justifyContent:"space-between"}}>
        {title}
        {copyToClipboard && <CopyToClipboardButton message={copyToClipboardMessage} toCopy={copyToClipboard}/>}
      </DialogTitle>
      {
        loading ? 
          <LoadingSpinner/>
          :
          <>
            <DialogContent dividers>
              {children ? 
                children
                :
                <Alert severity={severity}>{message}</Alert>
              }

            </DialogContent>
            <DialogActions>
              <Button onClick={onOk}>Ok</Button>
            </DialogActions>
          </>
      }
    </Dialog>
  );
}