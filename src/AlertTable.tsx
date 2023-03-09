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
        </tr>
        {alerts.map((alert) => (
          <AlertRow alert={alert} />
        ))}
      </table>
    </div>
  );
};

const AlertRow = ({ alert }: { alert: Alert }) => {
  return (
    <tr>
      <td>{alert.date.toString()}</td>
      <td>{alert.startTime.toString()}</td>
      <td>{alert.endTime.toString()}</td>
      <td>{alert.courtId}</td>
    </tr>
  );
};
