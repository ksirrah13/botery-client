import { useState } from "react";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import { AlertTable } from "./AlertTable";
import { createNewAlert, getAlerts } from "./helpers";
import { Alert } from "./types";

const App = () => {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("21:00");

  const [alerts, setAlerts] = useState<Alert[]>([]);

  const refreshAlerts = async () => {
    const alerts = await getAlerts();
    setAlerts(alerts);
  };

  return (
    <div>
      <label title="Date">
        <DatePicker
          onChange={(value: Date) => setDate(value)}
          value={date}
          locale="UTC"
        />
      </label>
      <TimePicker
        onChange={(value) => {
          if (typeof value === "string") {
            setStartTime(value);
          } else {
            console.log("other value", { value });
          }
        }}
        value={startTime}
        disableClock
        locale="UTC"
      />
      <TimePicker
        onChange={(value) => {
          if (typeof value === "string") {
            setEndTime(value);
          } else {
            console.log("other value", { value });
          }
        }}
        value={endTime}
        disableClock
        locale="UTC"
      />
      <button
        onClick={async (e) => {
          e.preventDefault();
          await createNewAlert({ date, start: startTime, end: endTime });
          await refreshAlerts();
        }}
      >
        Save New Alert
      </button>
      <AlertTable alerts={alerts} refreshAlerts={refreshAlerts} />
    </div>
  );
};

export default App;
