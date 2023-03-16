import { useState } from "react";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import { AlertTable } from "./AlertTable";
import { createNewAlert, getAlerts } from "./helpers";
import { Alert } from "./types";
import { Button, MenuItem, Select } from "@mui/material";

const App = () => {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("21:00");
  const [courtName, setCourtName] = useState("");

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
      <Select
        onChange={(event) => {
          const value = event.target.value as string;
          setCourtName(value);
        }}
        value={courtName}
        label="Court Location"
      >
        <MenuItem value={"hamilton"}>Hamilton</MenuItem>
        <MenuItem value={"dupont"}>Dupont</MenuItem>
        <MenuItem value={"mountain lake"}>Mountain Lake</MenuItem>
      </Select>
      <Button
        variant="contained"
        onClick={async (e) => {
          e.preventDefault();
          await createNewAlert({
            date,
            start: startTime,
            end: endTime,
            courtName,
          });
          await refreshAlerts();
        }}
      >
        Save New Alert
      </Button>
      <AlertTable alerts={alerts} refreshAlerts={refreshAlerts} />
    </div>
  );
};

export default App;
