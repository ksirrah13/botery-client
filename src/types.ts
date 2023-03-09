export interface Alert {
  _id: string;
  courtId: string;
  date: Date;
  userId: string;
  startTime: Date;
  endTime: Date;
  status: string;
}
