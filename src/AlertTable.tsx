import { Button } from '@mui/material';
import { deleteAlert, getCourtName } from './helpers';
import { Alert } from './types';

export const AlertTable = ({
  alerts,
  refreshAlerts,
  showAllTimes,
}: {
  alerts: Alert[];
  refreshAlerts: () => void;
  showAllTimes: boolean;
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
          <td>User</td>
          <td>Date</td>
          <td>Start Time</td>
          <td>End Time</td>
          <td>Court Name</td>
          <td>Status</td>
        </tr>
        {alerts
          .filter((alert) => {
            console.log({
              date: alert.date,
              millis: new Date(alert.date).getTime(),
              now: Date.now(),
            });
            return showAllTimes || new Date(alert.date).getTime() > Date.now();
          })
          .map((alert) => (
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
      <td>{alert.userId}</td>
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
