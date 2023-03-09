import { deleteAlert } from "./helpers";
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
      <button
        onClick={(e) => {
          e.preventDefault();
          refreshAlerts();
        }}
      >
        Refresh Alerts
      </button>
      <table>
        <tr>
          <td>Date</td>
          <td>Start Time</td>
          <td>End Time</td>
          <td>Court ID</td>
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
      <td>{alert.courtId}</td>
      <td>{alert.status}</td>
      <button
        onClick={async (e) => {
          e.preventDefault();
          await deleteAlert(alert._id);
          await refreshAlerts();
        }}
      >
        Delete
      </button>
    </tr>
  );
};
