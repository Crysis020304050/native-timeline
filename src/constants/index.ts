import { TimeUnit } from "../utils";

export const TIME_MODES: Readonly<{
  M: string;
  W: string;
  D: string;
}> = {
  M: "Months",
  W: "Weeks",
  D: "Days",
};

export const TIME_MODES_TO_TIME_UNITS: Record<string, TimeUnit> = {
  [TIME_MODES.M]: "months",
  [TIME_MODES.W]: "weeks",
  [TIME_MODES.D]: "days",
};
