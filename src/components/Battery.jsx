import React from "react";
import ReactSwitch from "react-switch";
import Arrow from "./arrow/Arrow";

const Battery = ({ batteryData, setBatteryData, checked, setChecked }) => {
  const switchHandler = () => {
    setChecked((prev) => ({...prev, value: !checked.value}));
  };

  const batteryConsumptionHandler = (e) => {
    setBatteryData((prev) => ({ ...prev, totalBatteryPower: e.target.value }));
  };

  return (
    <div>
      <h1>
        {batteryData.currentConsumption}w Battery
        {checked.value && checked.direction === "leftToRight"  && <Arrow leftToRight />}
      </h1>
      Input / Output Battery Power:
      <input
        value={batteryData.totalBatteryPower}
        onChange={batteryConsumptionHandler}
        type="number"
        min={0}
      />
      <br />
      <ReactSwitch checked={checked.value} onChange={switchHandler} />
    </div>
  );
};

export default Battery;
