import React from "react";
import Arrow from "./arrow/Arrow";
import { toast } from "react-toastify";

const Consumption = ({
  consumptionData,
  setConsumptionData,
  checked,
  interval,
}) => {
  function numbergeneratorbetweentwo(min, max) {
    min = +min;
    max = +max;
    return Math.round(min + Math.random() * (max - min));
  }

  const consumptionHandler = (e) => {
    const { name, value } = e.target;
    setConsumptionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>
        {consumptionData.currentConsumption}w Consumption
        {checked.value && checked.direction === "rightToLeft" && (
          <Arrow rightToLeft />
        )}
      </h1>
      Min :
      <input
        value={consumptionData.min}
        onChange={consumptionHandler}
        name="min"
        type="number"
        min={0}
      />
      &nbsp; Max:
      <input
        value={consumptionData.max}
        onChange={consumptionHandler}
        name="max"
        type="number"
        min={0}
      />
      <h2>{consumptionData.currentConsumption}w</h2>
    </div>
  );
};

export default Consumption;
