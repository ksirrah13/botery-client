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
  const headerCellStyle = 'p-2 border border-solid bg-slate-200 font-semibold';
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
      <table className="border-separate border border-solid">
        <thead>
          <tr>
            <td className={headerCellStyle}>User</td>
            <td className={headerCellStyle}>Date</td>
            <td className={headerCellStyle}>Court Name</td>
            <td className={headerCellStyle}>Start Time</td>
            <td className={headerCellStyle}>End Time</td>
            <td className={headerCellStyle}>Status</td>
            <td className={headerCellStyle}>Actions</td>
          </tr>
        </thead>

        <tbody>
          {alerts
            .filter((alert) => {
              console.log({
                date: alert.date,
                millis: new Date(alert.date).getTime(),
                now: Date.now(),
              });
              return (
                showAllTimes || new Date(alert.date).getTime() > Date.now()
              );
            })
            .sort(
              (alertA, alertB) =>
                new Date(alertA.date).getTime() -
                new Date(alertB.date).getTime()
            )
            .map((alert) => (
              <AlertRow
                key={alert._id}
                alert={alert}
                refreshAlerts={refreshAlerts}
              />
            ))}
        </tbody>
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
  const cellStyle = 'border border-solid p-2';
  const getAlertStyle = (status: string) => {
    const statusStyle = status === 'new' ? 'bg-green-100' : 'bg-red-100';
    return `${cellStyle} ${statusStyle}`;
  };
  const getTime = (dateInput: Date) => {
    const date = new Date(dateInput);
    return `${date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
    })}`;
  };
  const getDate = (dateInput: Date) => {
    const date = new Date(dateInput);
    return `${date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      weekday: 'short',
      timeZone: 'UTC',
    })}`;
  };
  return (
    <tr>
      <td className={cellStyle}>{alert.userId}</td>
      <td className={cellStyle}>{getDate(alert.date)}</td>
      <td className={cellStyle}>{getCourtName(alert.courtId)}</td>
      <td className={cellStyle}>{getTime(alert.startTime)}</td>
      <td className={cellStyle}>{getTime(alert.endTime)}</td>
      <td className={getAlertStyle(alert.status)}>{alert.status}</td>
      <td className={cellStyle}>
        <Button
          onClick={async (e) => {
            e.preventDefault();
            await deleteAlert(alert._id);
            await refreshAlerts();
          }}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};
