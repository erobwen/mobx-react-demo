import { observer } from "mobx-react";
import { Box, Card, CircularProgress, Typography, css } from "@mui/material";

export const formBoxCss = css`display:flex; flex-direction:column; gap:30px`;
export const formBoxStyle = {display: "flex", flexDirection: "column", gap: "30px"};

export const formCardCss = css`padding: 20px;max-width:500px`;
export const formCardStyle = {padding: "20px", maxWidth: "500px"};

export const spinnerWrapperCss = css`height: 200px; display:flex; justify-content:center; align-items: center;`;
export const spinnerWrapperStyle = {height: "200px", display: "flex", justifyContent: "center", alignItems: "center"};

export const StyledCard = observer(({style, header, name, loading=false, children}) => 
  (
    <Card 
    // css={formCardCss}
    style={{...formCardStyle, ...style}}
    >
      <Box 
        style={formBoxStyle} 
      // css={formBoxCss}
      >
        <Typography variant="h5" style={{textAlign: "center"}}>{name ? name : header}</Typography>
        {
          loading ? 
            <div 
            style={spinnerWrapperStyle}
            // css={spinnerWrapperCss}
            >
              <CircularProgress />
            </div>
            :
            <>
              {children}
            </>
        }
      </Box>
    </Card>  
  )
);

export const LoadingSpinner = () => {
  return (
    <Box style={spinnerWrapperStyle}>
      <CircularProgress />
    </Box>
  );
}