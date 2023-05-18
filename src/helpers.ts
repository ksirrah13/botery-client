import { CONFIG } from './config';

const createDateFromTimeString = (timeString: string) => {
  // create new date and set normalized hours and minutes
  const [hoursString, minutesString] = timeString.split(':');
  const hours = parseInt(hoursString);
  const minutes = parseInt(minutesString);
  const newDate = new Date();
  newDate.setUTCHours(hours);
  newDate.setUTCMinutes(minutes);
  newDate.setUTCSeconds(0);
  newDate.setUTCMilliseconds(0);
  return newDate;
};

export const getTodayNormalized = () => {
  const today = new Date()
  today.setHours(0)
  today.setMinutes(0)
  today.setSeconds(0)
  today.setMilliseconds(0)
  return today
}

export const createNewAlert = async ({
  date,
  start,
  end,
  courtName,
  userId,
  courtIdOverride,
}: {
  date: Date;
  start: string;
  end: string;
  courtName: string;
  userId: string;
  courtIdOverride?: string;
}) => {
  const startTime = createDateFromTimeString(start);
  const endTime = createDateFromTimeString(end);

  const courtIds = courtIdOverride
    ? courtIdOverride.split(',').map((courtId) => courtId.trim())
    : getCourtIdsForName(courtName);
  if (courtIds.length < 1) return;
  const data = { courtIds, date, startTime, endTime, userId };
  const createAlertUrl = `${CONFIG.API_URL}/alert`;
  try {
    const response = await fetch(createAlertUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const body = await response.json();
    return body;
  } catch (e) {
    console.error(e);
  }
};

export const getAlerts = async (userId?: string) => {
  const getAlertUrl = `${CONFIG.API_URL}/alerts${
    userId ? `?userId=${userId}` : ''
  }`;
  try {
    const response = await fetch(getAlertUrl);
    const body = await response.json();
    return body;
  } catch (e) {
    console.error(e);
  }
};

export const deleteAlert = async (id: string) => {
  const deleteAlertUrl = `${CONFIG.API_URL}/alert`;
  const data = { _id: id };
  try {
    const response = await fetch(deleteAlertUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const body = await response.json();
    return body;
  } catch (e) {
    console.error(e);
  }
};

const getCourtIdsForName = (courtName: string) => {
  const ids = COURT_IDS[courtName];
  if (ids && ids.length > 0) {
    return ids;
  }
  return [];
};

export const COURT_IDS: Record<string, string[]> = {
  Hamilton: ['4441573', '3333274'],
  DuPont: ['3333198', '3333266', '4441500', '4441524'],
  'Mountain Lake': ['3333197', '3333216', '3333202', '3333243'],
  'Alice Marble': ['4438853', '4433542', '3333206', '3333250'],
  'Buena Vista': ['3333257'],
  Dolores: ['3333264', '3676359', '3681093'],
  'Fulton Playground': ['3333269'],
  'JP Murphy': ['4441648', '4441694', '3333225'],
  Lafayette: ['3333234', '4421233'],
  McLaren: ['3333204', '3333208', '3333254', '3333255', '4441718', '4441819'],
};

export const getCourtName = (id: string) => {
  for (const entry of Object.entries(COURT_IDS)) {
    const foundIndex = entry[1].findIndex((arrId) => arrId === id);
    if (foundIndex !== -1) {
      return `${entry[0]} #${foundIndex + 1}`;
    }
  }
  return id;
};
