import moment from "moment";
import { TIME_MODES } from "../constants";

export type DateArgs = Date | moment.Moment | string | number;
export type TimeUnit = moment.unitOfTime.Base;

export const getStartOfTimeUnit = (time: DateArgs, unitOfTime?: TimeUnit) => {
  return moment(time)
    .startOf(unitOfTime || "days")
    .parseZone();
};

export const getEndOfTimeUnit = (time: DateArgs, unitOfTime?: TimeUnit) => {
  return moment(time)
    .endOf(unitOfTime || "days")
    .parseZone();
};

export const enumerateDatesBetweenDates = (
  startDate: DateArgs,
  endDate: DateArgs,
  unitOfTime?: TimeUnit,
): Array<string> => {
  const dates: Array<string> = [];
  const currDate = getStartOfTimeUnit(startDate, unitOfTime);
  const lastDate = getStartOfTimeUnit(endDate, unitOfTime);
  do {
    dates.push(currDate.clone().format("YYYY-MM-DD"));
  } while (currDate.add(1, unitOfTime || "days").diff(lastDate) <= 0);
  return dates;
};

export const getContainerSize = (
  timeMode: string,
  date: DateArgs,
  currentDayUnitSize: number,
): number => {
  switch (timeMode) {
    case TIME_MODES.M: {
      return moment(date).daysInMonth() * currentDayUnitSize;
    }
    case TIME_MODES.W: {
      return 7 * currentDayUnitSize;
    }
    case TIME_MODES.D: {
      return currentDayUnitSize;
    }
    default:
      return 0;
  }
};

export const getDistanceBetween = (
  startDate: DateArgs,
  endDate: DateArgs,
  currentDayUnitSize: number,
  isStartDistance?: boolean,
): number => {
  if (isStartDistance && moment(startDate).isSame(moment(endDate))) {
    return 0;
  }
  const days = enumerateDatesBetweenDates(getStartOfTimeUnit(startDate), getEndOfTimeUnit(endDate));
  return days.length * currentDayUnitSize;
};

export const isWeekend = (date: DateArgs): boolean => {
  const weekday = moment(date).format("dddd");
  return weekday === "Sunday" || weekday === "Saturday";
};

export const isToday = (date: DateArgs): boolean => {
  return moment().isSame(moment(date), "day");
};
