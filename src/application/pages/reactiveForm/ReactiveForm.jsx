import React from 'react'
import { observer } from 'mobx-react'
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { computed, makeObservable, observable, reaction } from 'mobx'
import { Store, useStore } from '../../../general/util-mobx-react'
import { LoadingSpinner } from '../../../general/components/StyledCard'
import { sleep } from '../../../general/util-mobx-react/utility'
import { columnStyle } from '../../../general/style/style'

/**
 * Client mock
 */
class MockClient {
  async getNetworkProtocols() {
    await sleep(1000);
    return ["IPv4", "IPv6"];
  }

  async getCountries() {
    await sleep(1000);
    return ["Malta", "Sweden"];
  }
}

const mockClient = new MockClient();

const locatingMethodOptions = ["Network adress", "Postal code"];


/**
 * Reactive form store.
 */
export class ReactiveFormStore extends Store {
  constructor() {
    super();
    this.networkProtocolOptions = null;
    this.countryOptions = null;
    
    this.errorMessage = null;

    this.data = {
      name: "",
      locatingMethod: "",
      networkProtocol: "",
      country: "",
      ipV4Adress: "",
      ipV6Adress: "",
      swedishPostalCode: "",
      maltaPostalCode: ""
    }

    makeObservable(this, {
      data: observable,
      networkProtocolOptions: observable,
      countryOptions: observable,
      errorMessage: observable,

      networkProtocolVisible: computed,
      countryVisible: computed,
      ipV4AdressVisible: computed, 
      ipV6AdressVisible: computed,
      swedishPostalCodeVisible: computed, 
      maltaPostalCodeVisible: computed,

      valid: computed,
    });
  }

  onCreated() {
    reaction(
      () => this.networkProtocolVisible, 
      visible => {
        if (visible && !this.networkProtocolOptions) {
          this.loadChoice1Options();
        }
      }
    )
    reaction(
      () => this.countryVisible, 
      visible => {
        if (visible && !this.countryOptions) {
          this.loadChoice2Options();
        }
      }
    )
  }
  

  async loadChoice1Options() {
    try {
      this.networkProtocolOptions = await mockClient.getNetworkProtocols();
    } catch (error) {
      this.errorMessage = error.message;
    }
  }

  async loadChoice2Options() {
    try {
      this.countryOptions = await mockClient.getCountries();
    } catch (error) {
      this.errorMessage = error.message;
    }
  }

  getResult() {
    const result = {
      name: this.data.name,
      locatingMethod: this.data.locatingMethod
    }
    if (result.locatingMethod === "Network adress") {
      result.networkProtocol = this.data.networkProtocol; 
      if (result.networkProtocol === "IPv4") {
        result.ipV4Adress = this.data.ipV4Adress;
      } else {
        result.ipV6Adress = this.data.ipV6Adress;
      }
    } else {
      result.country = this.data.country; 
      if (result.country === "Sweden") {
        result.swedishPostalCode = this.data.swedishPostalCode;
      } else {
        result.maltaPostalCode = this.data.maltaPostalCode;
      }
    }
    return result; 
  }

  get valid() {
    return this.data.name.length > 3 && (
      (this.ipV4AdressVisible && this.data.ipV4Adress.length > 3) || 
      (this.ipV6AdressVisible && this.data.ipV6Adress.length > 3) || 
      (this.swedishPostalCodeVisible && this.data.swedishPostalCode.length > 3) || 
      (this.maltaPostalCodeVisible && this.data.maltaPostalCode.length > 3) 
    )
  }
  
  get networkProtocolVisible() {
    return this.data.locatingMethod === "Network adress";  
  }

  get countryVisible() {
    return this.data.locatingMethod === "Postal code";  
  }

  get ipV4AdressVisible() {
    return this.networkProtocolVisible && this.data.networkProtocol === "IPv4";  
  }

  get ipV6AdressVisible() {
    return this.networkProtocolVisible && this.data.networkProtocol === "IPv6";  
  }

  get swedishPostalCodeVisible() {
    return this.countryVisible && this.data.country === "Sweden";  
  }

  get maltaPostalCodeVisible() {
    return this.countryVisible && this.data.country === "Malta";  
  }
}


/**
 * A reactive form.
 */
export const ReactiveForm = observer(() => {

  const store = useStore(ReactiveFormStore);

  return (
    <Box style={columnStyle}>
      <Input label="Name" value={store.data.name} setValue={newValue => {store.data.name = newValue}}/>
      <Selector label="Locating Method" value={store.data.locatingMethod} setValue={newValue => { store.data.locatingMethod = newValue }} options={locatingMethodOptions} />
      { 
        store.networkProtocolVisible &&  
          <Selector label="Network protocol" value={store.data.networkProtocol} setValue={newValue => { store.data.networkProtocol = newValue }} options={store.networkProtocolOptions} />
      }
      {
        store.ipV4AdressVisible &&
          <Input label="IpV4 Adress" value={store.data.ipV4Adress} setValue={newValue => { store.data.ipV4Adress = newValue }}/>
      }
      {
        store.ipV6AdressVisible &&
          <Input label="IpV6 Adress" value={store.data.ipV6Adress} setValue={newValue => { store.data.ipV6Adress = newValue }}/>
      }
      {
        store.countryVisible &&
          <Selector label="Country" value={store.data.country} setValue={newValue => { store.data.country = newValue }} options={store.countryOptions} />
      }
      {
        store.swedishPostalCodeVisible &&
          <Input label="Swedish postal code" value={store.data.swedishPostalCode} setValue={newValue => { store.data.swedishPostalCode = newValue }}/>
      }
      {
        store.maltaPostalCodeVisible &&
          <Input label="Malta postal code" value={store.data.maltaPostalCode} setValue={newValue => { store.data.maltaPostalCode = newValue }}/>
      }
      {
        store.errorMessage && 
          <Alert severity='warning'>{store.errorMessage}</Alert>
      }
      <Button style={{width: 100}} disabled={!store.valid} onClick={() => alert("you submitted " + JSON.stringify(store.getResult()))}>Submit</Button>
    </Box>
  );
})

const Input = observer(({label, value, setValue }) => {
  return <TextField id={label} label={label} variant="standard" value={value} onChange={event => setValue(event.target.value)} />
})

const Selector = observer(({label, options, value, setValue}) => {
  return (options === null) ? 
    <LoadingSpinner/>
    :
    <FormControl fullWidth>
      <InputLabel id={label}>{label}</InputLabel>
      <Select
        id={label} 
        value={value}
        label={label}
        onChange={event => setValue(event.target.value)}
      >
        {options.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
      </Select>
    </FormControl>
});
