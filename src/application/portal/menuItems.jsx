import { AdminPage } from '../pages/AdminPage';
import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings';
import AutoAwesomeMosaic from '@mui/icons-material/AutoAwesomeMosaic';
import Animation from '@mui/icons-material/Animation';
import { DataLoadingExample } from '../pages/dataLoading/DataLoadingExample';
import { ReactiveFormExample } from '../pages/reactiveForm/ReactiveFormExample';
import { MultiplePassedStateExample } from '../pages/multiplePassedState/MultiplePassedStateExample';
import { IntermediateStateExample } from '../pages/intermediateState/IntermediateStateExample';
import { BasicStateExample } from '../pages/basicState/BasicStateExample';
import { ComponentWithStoreExample } from '../pages/componentWithStore/ComponentWithStoreExample';
import { GlobalStateExample } from '../pages/globalState/GlobalStateExample';
import { PartiallySharedStateExample } from '../pages/partiallySharedState/PartiallySharedStateExample';
import { ContextualStateInheritanceExample } from '../pages/contextualStateInheritance/ContextualStateInheritanceExample';
import { EditCopyExample } from '../pages/editCopy/EditCopyExample';

export const menuItems = [
  {
    name: "Basic State",
    path: "basic-state",
    Component: BasicStateExample,
    icon: AutoAwesomeMosaic
  },
  {
    name: "Component With Store",
    path: "component-with-store",
    Component: ComponentWithStoreExample,
    icon: AutoAwesomeMosaic
  },
  {
    name: "Data Loading",
    path: "data-loading",
    Component: DataLoadingExample,
    icon: AutoAwesomeMosaic
  },
  {
    name: "Global State",
    path: "global-state",
    Component: GlobalStateExample,
    icon: Animation
  },  
  {
    name: "Multiple Passed States",
    path: "multiple-passed-state",
    Component: MultiplePassedStateExample,
    icon: Animation
  },    
  {
    name: "Intermediate Shared State",
    path: "intermediate-state",
    Component: IntermediateStateExample,
    icon: Animation
  },  
  {
    name: "Partially Passed State",
    path: "partially-shared-state",
    Component: PartiallySharedStateExample,
    icon: Animation
  },  
  {
    name: "Contextual State",
    path: "inherit-state",
    Component: ContextualStateInheritanceExample,
    icon: Animation
  },  
  {
    name: "Edit Copy",
    path: "edit-copy",
    Component: EditCopyExample,
    icon: AutoAwesomeMosaic
  },
  {
    name: "Reactive Form",
    path: "reactive-form-example",
    Component: ReactiveFormExample,
    icon: AutoAwesomeMosaic
  },
  {
    name: "Admin",
    path: "admin",
    Component: AdminPage,
    icon: AdminPanelSettings,
    roles: ["admin"]
  }
];