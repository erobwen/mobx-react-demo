import { Typography } from "@mui/material";
import { DataLoadingStore } from "./DataLoadingStore";
import { observer } from "mobx-react";
import { useStore } from "../../../general/util-mobx-react";
import { columnStyle } from "../../../general/style/style";
import { LoadingSpinner } from "../../../general/components/StyledCard";
import { ComponentCard } from "../../../general/components/ComponentCard";

export const DataLoading = observer(() => {
  const store = useStore(DataLoadingStore);

  return (
    <ComponentCard style={columnStyle}>
      <Typography variant="h5">Loaded users</Typography>
      {store.loading ? 
        <LoadingSpinner/>
        :
        <> 
          { store.users.map(user => {
              return (
                <Typography key={user.name}>{user.name}</Typography>
              );
            })
          }
        </>
      }
    </ComponentCard>
  );
})