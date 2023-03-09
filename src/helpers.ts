import { CONFIG } from "./config";

const createDateFromTimeString = (timeString: string) => {
  // create new date and set normalized hours and minutes
  const [hoursString, minutesString] = timeString.split(":");
  const hours = parseInt(hoursString);
  const minutes = parseInt(minutesString);
  const newDate = new Date();
  newDate.setUTCHours(hours);
  newDate.setUTCMinutes(minutes);
  return newDate;
};

export const createNewAlert = async ({
  date,
  start,
  end,
}: {
  date: Date;
  start: string;
  end: string;
}) => {
  const startTime = createDateFromTimeString(start);
  const endTime = createDateFromTimeString(end);
  const data = { courtId: "4441573", date, startTime, endTime };
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
    console.log(body);
    return body;
  } catch (e) {
    console.error(e);
  }
};
