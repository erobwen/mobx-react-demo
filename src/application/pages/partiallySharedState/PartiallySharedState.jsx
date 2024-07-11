import React from 'react'
import { observer } from 'mobx-react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { computed, makeObservable, observable } from 'mobx'
import { Store, useObservable, useStore } from '../../../general/util-mobx-react'
import { pagePadding, columnStyle, rowStyle, hardShadow } from '../../../general/style/style'
import { ComponentCard } from '../../../general/components/ComponentCard';

/**
 * Car data. 
 */
const carData = {
  owner: "Nigel Mansell",
  engine: {
    horsepower: 800,
    cylinderVolume: 6 
  },
  frontLeftTire: {
    pressure: 2.5,
    patternDepth: 1.6 
  },
  frontRightTire: {
    pressure: 2.7,
    patternDepth: 1.5 
  },
  rearLeftTire: {
    pressure: 2.5,
    patternDepth: 2.3 
  },
  rearRightTire: {
    pressure: 2.1,
    patternDepth: 2.4 
  }
};


/**
 * A component that demonstrates partial sharing of data
 */
export const PartiallySharedState = observer(() => {

  const car = useObservable(() => carData);

  return (
    <>
      <Typography>Car data:</Typography>
      <Typography>{JSON.stringify(car, 2)}</Typography>
      <Car car={car}/>
    </>
  );
})



/**
 * A store for the car component
 */
export class CarStore extends Store {
  constructor({car}) {
    super();
    this.car = car;

    makeObservable(this, {
      car: observable,
      averageTirePressure: computed
    });
  }

  get averageTirePressure() {
    return (this.car.frontLeftTire.pressure + this.car.frontRightTire.pressure + this.car.rearLeftTire.pressure + this.car.rearRightTire.pressure) / 4; 
  }
}


/**
 * A component for editing a car
 */
const Car = observer(({car}) => {
  const store = useStore(CarStore, {car});

  return (
    <ComponentCard style={{boxShadow: hardShadow, padding: pagePadding, ...columnStyle}}>
      <Typography variant="h6">Car</Typography>
      <Typography>Owner: {car.owner}</Typography>
      <Typography>Average Tire Pressure: {store.averageTirePressure}</Typography>
      <Engine engine={car.engine}/>
      <Tire name="Front Left" tire={car.frontLeftTire}/>
      <Tire name="Front Right" tire={car.frontRightTire}/>
      <Tire name="Rear Left" tire={car.rearLeftTire}/>
      <Tire name="Rear Right" tire={car.rearRightTire}/>
    </ComponentCard>
  );
})


/**
 * An engine editing component
 */
const Engine = observer(({engine}) => {
  return (
    <ComponentCard style={{boxShadow: hardShadow, padding: pagePadding, ...columnStyle}}>
      <Typography variant="h6">Engine</Typography>
      <Input label="Horsepower" value={engine.horsepower} setValue={newValue => engine.horsepower = newValue}/>
      <Input label="Cylinder Volume" value={engine.cylinderVolume} setValue={newValue => engine.cylinderVolume = newValue}/>
    </ComponentCard>
  );
})


/**
 * A tire editing component
 */
const Tire = observer(({name, tire}) => {
  return (
    <ComponentCard style={{boxShadow: hardShadow, padding: pagePadding, ...columnStyle}}>
      <Typography variant="h6">Tire: {name}</Typography>
      <Input label="Pressure" value={tire.pressure} setValue={newValue => tire.pressure = newValue}/>
      <Input label="Pattern depth" value={tire.patternDepth} setValue={newValue => tire.patternDepth = newValue}/>
    </ComponentCard>
  );
})


/**
 * Generic input component
 */
const Input = observer(({label, value, setValue }) => {
  const handleChange = (event) => {
    const value = event.target.value;
    if (!isNaN(parseFloat(value))) setValue(parseFloat(value));
  }
  return <TextField inputProps={{ type: 'number'}} id={label} label={label} variant="standard" value={value} onChange={handleChange} />
})
