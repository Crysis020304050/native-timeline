import styled from "@emotion/native";
import { pathOr } from "ramda";
import React from "react";
import { EventsExpanding, ID, ItemProps, ModesToDayContainerSize, OnItemPress } from "../../index";
import { DateArgs, getDistanceBetween } from "../../utils";
import EventText from "./event-text";

interface Props {
  props: ItemProps;
  subItems?: Array<ItemProps>;
  onMainItemPress?: OnItemPress;
  onSubItemPress?: OnItemPress;
  showSubItemsOnMainItemPress: boolean;
  timeMode: string;
  eventsExpanding: EventsExpanding;
  firstIntervalDate: DateArgs;
  position: number;
  index: number;
  updateEventsExpanding: (isExpanded: boolean, index: number) => void;
  scrollPosition: number;
  modesToDayContainerSize: ModesToDayContainerSize;
  gapBetweenEvents: number;
  horizontal?: boolean;
}

const EventContainer = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  align-items: center;
  border-radius: 4px;
  overflow: hidden;
  background-color: #32a5e7;
  width: 20px;
  height: 25px;
`;

const EventItem: React.FC<Props> = ({
  props,
  showSubItemsOnMainItemPress,
  onSubItemPress,
  onMainItemPress,
  subItems,
  timeMode,
  position,
  firstIntervalDate,
  index,
  updateEventsExpanding,
  eventsExpanding,
  scrollPosition,
  modesToDayContainerSize,
  gapBetweenEvents,
  horizontal,
}) => {
  const getStyles = (startDate: DateArgs, endDate: DateArgs): Record<string, number> => {
    const size = getDistanceBetween(startDate, endDate, modesToDayContainerSize[timeMode]);
    const initialPosition = getDistanceBetween(
      firstIntervalDate,
      startDate,
      modesToDayContainerSize[timeMode],
      true,
    );
    return {
      [horizontal ? "width" : "height"]: size,
      [horizontal ? "left" : "top"]: initialPosition,
    };
  };

  const onEventPress = (id: ID) => {
    if (showSubItemsOnMainItemPress && subItems) {
      if (eventsExpanding[index]) {
        updateEventsExpanding(false, index);
      } else {
        updateEventsExpanding(true, index);
      }
    }
    onMainItemPress && onMainItemPress(id);
  };

  const renderSubEvents = (): React.ReactNode => {
    if (!subItems) {
      return null;
    }
    return subItems.map(({ startDate, endDate, styles, title, id }, i) => {
      const subItemsPosition = position + gapBetweenEvents * (i + 1);
      const calculatedStyles = getStyles(startDate, endDate);
      return (
        <EventContainer
          key={id}
          style={{
            ...pathOr({}, ["container"], styles),
            ...(horizontal && { flexDirection: "row" }),
            [horizontal ? "top" : "left"]: subItemsPosition,
            ...calculatedStyles,
          }}
          onPress={() => onSubItemPress && onSubItemPress(id)}
          activeOpacity={0.9}
        >
          <EventText
            style={{
              ...pathOr({}, ["text"], styles),
              ...(calculatedStyles[horizontal ? "left" : "top"] < scrollPosition && {
                [horizontal ? "left" : "top"]:
                  scrollPosition - calculatedStyles[horizontal ? "left" : "top"],
              }),
            }}
            text={title}
            horizontal={horizontal}
          />
        </EventContainer>
      );
    });
  };

  const renderEvent = (): React.ReactNode => {
    const { startDate, endDate, title, styles, id } = props;
    const calculatedStyles = getStyles(startDate, endDate);
    return (
      <EventContainer
        style={{
          ...pathOr({}, ["container"], styles),
          ...(horizontal && { flexDirection: "row" }),
          ...calculatedStyles,
          [horizontal ? "top" : "left"]: position,
        }}
        onPress={() => onEventPress(id)}
        activeOpacity={0.9}
      >
        <EventText
          style={{
            ...pathOr({}, ["text"], styles),
            ...(calculatedStyles[horizontal ? "left" : "top"] < scrollPosition && {
              [horizontal ? "left" : "top"]:
                scrollPosition - calculatedStyles[horizontal ? "left" : "top"],
            }),
          }}
          text={title}
          horizontal={horizontal}
        />
      </EventContainer>
    );
  };

  return (
    <>
      {renderEvent()}
      {eventsExpanding[index] && renderSubEvents()}
    </>
  );
};

export default EventItem;
