import { CONFIG } from "./config";

const createDateFromTimeString = (timeString: string) => {
  // create new date and set normalized hours and minutes
  const [hoursString, minutesString] = timeString.split(":");
  const hours = parseInt(hoursString);
  const minutes = parseInt(minutesString);
  const newDate = new Date();
  newDate.setUTCHours(hours);
  newDate.setUTCMinutes(minutes);
  newDate.setUTCSeconds(0);
  newDate.setUTCMilliseconds(0);
  return newDate;
};

export const createNewAlert = async ({
  date,
  start,
  end,
  courtName,
}: {
  date: Date;
  start: string;
  end: string;
  courtName: string;
}) => {
  const startTime = createDateFromTimeString(start);
  const endTime = createDateFromTimeString(end);
  const courtIds = getCourtIdsForName(courtName);
  if (courtIds.length < 1) return;
  const data = { courtIds, date, startTime, endTime };
  const createAlertUrl = `${CONFIG.API_URL}/alert`;
  try {
    const response = await fetch(createAlertUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const body = await response.json();
    console.log(body);
    return body;
  } catch (e) {
    console.error(e);
  }
};

export const getAlerts = async () => {
  const getAlertUrl = `${CONFIG.API_URL}/alerts`;
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
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
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

const COURT_IDS: Record<string, string[]> = {
  hamilton: ["4441573", "3333274"],
  dupont: ["3333198", "3333266", "4441500", "4441524"],
  "mountain lake": ["3333197", "3333216", "3333202", "3333243"],
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
