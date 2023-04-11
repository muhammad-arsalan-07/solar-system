import React from "react";
import Arrow from "./arrow/Arrow";

const Production = ({ productionData, setProductionData, interval }) => {


  const totalProductionHandler = (e) => {
    setProductionData((prev) => ({
      ...prev,
      totalProduction: e.target.value,
    }));
    clearInterval(interval.current);
    interval.current = null;
    interval.current = setInterval(() => {}, 1000);
  };
  return (
    <div>
      <h1>
        Production
        <Arrow rightToLeft />
      </h1>
      <input
        value={productionData.totalProduction}
        onChange={totalProductionHandler}
        type="number"
        min={0}
      />
      <h2>{productionData.currentProduction}w</h2>
    </div>
  );
};

export default Production;
