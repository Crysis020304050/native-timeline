import styled from "@emotion/native";
import { pathOr } from "ramda";
import React from "react";
import { TIME_MODES, TIME_MODES_TO_TIME_UNITS } from "../../constants";
import { DateLinesStyles, ModesToDayContainerSize } from "../../index";
import {
  DateArgs,
  enumerateDatesBetweenDates,
  getContainerSize,
  getEndOfTimeUnit,
  getStartOfTimeUnit,
  isToday,
  isWeekend,
} from "../../utils";

const LinesContainer = styled.View`
  width: 100%;
  height: 100%;
  border-color: #bbbbbb;
  background-color: #ffffff;
  border-right-width: 1px;
  border-bottom-width: 1px;
`;

const SubLine = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-color: #bbbbbb;
  border-right-width: 1px;
  border-bottom-width: 1px;
`;

interface Props {
  timeMode: string;
  date: DateArgs;
  dateLinesStyles?: DateLinesStyles;
  modesToDayContainerSize: ModesToDayContainerSize;
  horizontal?: boolean;
}

const Line: React.FC<Props> = ({
  timeMode,
  date,
  dateLinesStyles,
  modesToDayContainerSize,
  horizontal,
}) => {
  const size = getContainerSize(timeMode, date, modesToDayContainerSize[timeMode]);

  const renderSubLines = () => {
    switch (timeMode) {
      case TIME_MODES.D:
        return null;
      case TIME_MODES.M:
      case TIME_MODES.W: {
        const days = enumerateDatesBetweenDates(
          getStartOfTimeUnit(date, TIME_MODES_TO_TIME_UNITS[timeMode]),
          getEndOfTimeUnit(date, TIME_MODES_TO_TIME_UNITS[timeMode]),
        );
        return days.map((day, index) => {
          return (
            <SubLine
              key={day}
              style={{
                ...pathOr({}, ["day"], dateLinesStyles),
                ...(isWeekend(day) && {
                  backgroundColor: "#DEDEDE",
                  ...pathOr({}, ["weekend"], dateLinesStyles),
                }),
                ...(isToday(day) && {
                  backgroundColor: "#BBD0DE",
                  ...pathOr({}, ["today"], dateLinesStyles),
                }),
                [horizontal ? "left" : "top"]: (size / days.length) * index,
                [horizontal ? "width" : "height"]: size / days.length,
              }}
            />
          );
        });
      }
    }
  };

  return (
    <LinesContainer
      style={{
        ...(timeMode === TIME_MODES.D && {
          ...pathOr({}, ["day"], dateLinesStyles),
          ...(isWeekend(date) && {
            backgroundColor: "#DEDEDE",
            ...pathOr({}, ["weekend"], dateLinesStyles),
          }),
          ...(isToday(date) && {
            backgroundColor: "#BBD0DE",
            ...pathOr({}, ["today"], dateLinesStyles),
          }),
        }),
        [horizontal ? "width" : "height"]: size,
      }}
    >
      {renderSubLines()}
    </LinesContainer>
  );
};

export default Line;
