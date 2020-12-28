import styled from "@emotion/native";
import moment from "moment";
import { path, pathOr } from "ramda";
import React from "react";
import { TIME_MODES, TIME_MODES_TO_TIME_UNITS } from "../../constants";
import { DatesFormat, ModesToDayContainerSize, Styles } from "../../index";
import { DateArgs, getContainerSize, getEndOfTimeUnit, getStartOfTimeUnit } from "../../utils";

const DateItem = styled.View`
  border-color: #bbbbbb;
  border-bottom-width: 1px;
  border-right-width: 1px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #555555;
  width: 80px;
  height: 80px;
`;

const DateItemText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: white;
  text-align: center;
`;

interface Props {
  date: DateArgs;
  timeMode: string;
  datesFormat?: DatesFormat;
  datesStyles?: Styles;
  modesToDayContainerSize: ModesToDayContainerSize;
  horizontal?: boolean;
}

const TimelineDate: React.FC<Props> = ({
  date,
  timeMode,
  datesFormat,
  datesStyles,
  modesToDayContainerSize,
  horizontal,
}) => {
  const getText = (): string => {
    switch (timeMode) {
      case TIME_MODES.M: {
        return moment(date).format(pathOr("MMM", [timeMode], datesFormat));
      }
      case TIME_MODES.W: {
        return `${getStartOfTimeUnit(date, TIME_MODES_TO_TIME_UNITS[timeMode]).format(
          pathOr("MM-DD", [timeMode], datesFormat),
        )}\n${getEndOfTimeUnit(date, TIME_MODES_TO_TIME_UNITS[timeMode]).format(
          pathOr("MM-DD", [timeMode], datesFormat),
        )}`;
      }
      case TIME_MODES.D: {
        return moment(date).format(pathOr("DD ddd", [timeMode], datesFormat));
      }
      default:
        return "";
    }
  };

  return (
    <DateItem
      style={{
        ...pathOr({}, ["container"], datesStyles),
        [horizontal ? "width" : "height"]: getContainerSize(
          timeMode,
          date,
          modesToDayContainerSize[timeMode],
        ),
      }}
    >
      <DateItemText style={path(["text"], datesStyles)}>{getText()}</DateItemText>
    </DateItem>
  );
};

export default TimelineDate;
