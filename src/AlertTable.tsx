import { Button } from "@mui/material";
import { deleteAlert, getCourtName } from "./helpers";
import { Alert } from "./types";

export const AlertTable = ({
  alerts,
  refreshAlerts,
}: {
  alerts: Alert[];
  refreshAlerts: () => void;
}) => {
  return (
    <div>
      <h2>Alerts</h2>
      <Button
        variant="outlined"
        onClick={(e) => {
          e.preventDefault();
          refreshAlerts();
        }}
      >
        Refresh Alerts
      </Button>
      <table>
        <tr>
          <td>Date</td>
          <td>Start Time</td>
          <td>End Time</td>
          <td>Court Name</td>
          <td>Status</td>
        </tr>
        {alerts.map((alert) => (
          <AlertRow
            key={alert._id}
            alert={alert}
            refreshAlerts={refreshAlerts}
          />
        ))}
      </table>
    </div>
  );
};

const AlertRow = ({
  alert,
  refreshAlerts,
}: {
  alert: Alert;
  refreshAlerts: () => void;
}) => {
  return (
    <tr>
      <td>{alert.date.toString()}</td>
      <td>{alert.startTime.toString()}</td>
      <td>{alert.endTime.toString()}</td>
      <td>{getCourtName(alert.courtId)}</td>
      <td>{alert.status}</td>
      <Button
        onClick={async (e) => {
          e.preventDefault();
          await deleteAlert(alert._id);
          await refreshAlerts();
        }}
      >
        Delete
      </Button>
    </tr>
  );
};
