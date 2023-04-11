import { useState } from "react";
import "./App.css";
import Production from "./components/Production";
import Consumption from "./components/Consumption";
import Battery from "./components/Battery";
import { useRef } from "react";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const interval = useRef(null);
  const timeout = useRef(null);

  const [productionData, setProductionData] = useState({
    totalProduction: 0,
    currentProduction: 0,
  });
  const [consumptionData, setConsumptionData] = useState({
    currentConsumption: 0,
    min: 0,
    max: 0,
  });
  const [batteryData, setBatteryData] = useState({
    currentConsumption: 0,
    totalBatteryPower: 0,
  });
  const [checked, setChecked] = useState({
    value: true,
    direction: "rightToLeft",
  });

  function numbergeneratorbetweentwo(min, max) {
    return Math.round(min + Math.random() * (max - min));
  }

  useEffect(() => {
    if (
      productionData.totalProduction &&
      consumptionData.min &&
      consumptionData.max
    ) {
      if (+consumptionData.min <= +consumptionData.max) {
        clearTimeout(timeout.current);
        timeout.current = null;
        const consumption = numbergeneratorbetweentwo(
          +consumptionData.min,
          +consumptionData.max
        );

        if (checked.value) {
          clearInterval(interval.current);
          interval.current = null;
          interval.current = setInterval(() => {
            if (+productionData.totalProduction < consumption) {
              setChecked((prev) => ({ ...prev, direction: "leftToRight" }));
              const requiredBattery =
                consumption - +productionData.totalProduction;

              if (requiredBattery) {
                if (requiredBattery <= batteryData.totalBatteryPower) {
                  setBatteryData((prev) => ({
                    ...prev,
                    currentConsumption: requiredBattery,
                  }));
                } else {
                  setBatteryData((prev) => ({
                    ...prev,
                    currentConsumption: batteryData.totalBatteryPower,
                  }));
                  toast.error(
                    "your consumption is greater than your production",
                    {
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                    }
                  );
                }
              }
              setProductionData((prev) => ({
                ...prev,
                currentProduction: productionData.totalProduction,
              }));
            } else {
              setChecked((prev) => ({ ...prev, direction: "rightToLeft" }));
              let batteryConsumption =
                productionData.totalProduction - consumption;
              if (batteryConsumption > batteryData.totalBatteryPower) {
                batteryConsumption = +batteryData.totalBatteryPower;
              }
              setBatteryData((prev) => ({
                ...prev,
                currentConsumption: batteryConsumption,
              }));

              setProductionData((prev) => ({
                ...prev,
                currentProduction: consumption + batteryConsumption,
              }));
            }
            setConsumptionData((prev) => ({
              ...prev,
              currentConsumption: consumption,
            }));
          }, 5000);
        } else {
          clearInterval(interval.current);
          interval.current = null;
          interval.current = setInterval(() => {
            if (+productionData.totalProduction < consumption) {
              toast.error("your consumption is greater than your production", {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });

              setProductionData((prev) => ({
                ...prev,
                currentProduction: productionData.totalProduction,
              }));
            } else {
              setProductionData((prev) => ({
                ...prev,
                currentProduction: consumption,
              }));
            }
            setConsumptionData((prev) => ({
              ...prev,
              currentConsumption: consumption,
            }));
            setBatteryData((prev) => ({ ...prev, currentConsumption: 0 }));
          }, 5000);
        }
      } else {
        clearTimeout(timeout.current);
        timeout.current = null;
        timeout.current = setTimeout(() => {
          toast.error(
            "your minimum consumption is greater than your maximum consumption",
            {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            }
          );
        }, 1000);
      }
    }
  }, [productionData, consumptionData, batteryData, checked]);

  return (
    <>
      <div className="solar-system">
        <Production
          productionData={productionData}
          setProductionData={setProductionData}
          interval={interval}
        />
        <Consumption
          consumptionData={consumptionData}
          setConsumptionData={setConsumptionData}
          checked={checked}
          interval={interval}
        />
        <Battery
          batteryData={batteryData}
          setBatteryData={setBatteryData}
          checked={checked}
          setChecked={setChecked}
          interval={interval}
        />
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
