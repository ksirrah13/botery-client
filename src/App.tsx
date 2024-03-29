import {
  Button,
  Collapse,
  MenuItem,
  Switch,
  TextField
} from '@mui/material';
import { useState } from 'react';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import { AlertTable } from './AlertTable';
import { COURT_IDS, createNewAlert, getAlerts, getTodayNormalized } from './helpers';
import { Alert } from './types';

const App = () => {
  const [date, setDate] = useState(getTodayNormalized());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('21:00');
  const [courtName, setCourtName] = useState('');
  const [courtIdOverride, setCourtIdOverride] = useState('');
  const [userId, setUserId] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const [showAllTimes, setShowAllTimes] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const refreshAlerts = async (userIdOverride?: string) => {
    const alerts =
      (await getAlerts(showAllUsers ? '' : userIdOverride ?? userId)) ?? [];
    setAlerts(alerts);
  };

  return (
    <div className="flex flex-col gap-y-4 p-6">
      <div className="flex gap-x-2">
        <label title="Date">
          <DatePicker
            onChange={(value: Date) => setDate(value)}
            value={date}
            locale="UTC"
          />
        </label>
        <TimePicker
          onChange={(value) => {
            if (typeof value === 'string') {
              setStartTime(value);
            } else {
              console.log('other value', { value });
            }
          }}
          value={startTime}
          disableClock
          locale="UTC"
        />
        <TimePicker
          onChange={(value) => {
            if (typeof value === 'string') {
              setEndTime(value);
            } else {
              console.log('other value', { value });
            }
          }}
          value={endTime}
          disableClock
          locale="UTC"
        />
      </div>
      <div className="flex gap-x-2 max-w-sm">
        <TextField
          select
          onChange={(event) => {
            const value = event.target.value as string;
            setCourtName(value);
          }}
          value={courtName}
          label="Court Location"
          placeholder="Select court location"
          className="w-1/2"
        >
          {Object.keys(COURT_IDS).map((court) => (
            <MenuItem key={court} value={court}>
              {court}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          onChange={(event) => {
            const value = event.target.value as string;
            setUserId(value);
            refreshAlerts(value);
          }}
          value={userId}
          label="User"
          placeholder="Select user"
          className="w-1/2"
        >
          <MenuItem value={'kyle'}>Kyle</MenuItem>
          <MenuItem value={'avi'}>Avi</MenuItem>
          <MenuItem value={'steph'}>Steph</MenuItem>
        </TextField>
      </div>
      <div>
        <h2 onClick={toggleCollapse}>Advanced Options</h2>
        <Collapse in={isOpen}>
          <div className="flex flex-col gap-y-2 max-w-sm">
            <TextField
              label="Custom court id"
              variant="outlined"
              value={courtIdOverride}
              onChange={(event) => setCourtIdOverride(event.target.value)}
            />
            <div>
              <Switch
                onChange={(event) => setShowAllTimes(event.target.checked)}
              />
              <label>Show All Times</label>
            </div>
            <div>
              <Switch
                onChange={(event) => setShowAllUsers(event.target.checked)}
              />
              <label>Show All Users</label>
            </div>
          </div>
        </Collapse>
      </div>
      <div>
        <Button
          variant="contained"
          onClick={async (e) => {
            e.preventDefault();
            await createNewAlert({
              date,
              start: startTime,
              end: endTime,
              courtName,
              userId,
              courtIdOverride,
            });
            await refreshAlerts(userId);
          }}
        >
          Save New Alert
        </Button>
      </div>
      <AlertTable
        alerts={alerts}
        refreshAlerts={refreshAlerts}
        showAllTimes={showAllTimes}
      />
    </div>
  );
};

export default App;
