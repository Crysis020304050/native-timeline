import styled from "@emotion/native";
import { pathOr } from "ramda";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import {
  Data,
  DateLinesStyles,
  DatesFormat,
  EventsExpanding,
  EventsPosition,
  ModesToDayContainerSize,
  OnItemPress,
  ScrollRef,
  Styles,
} from "../index";
import { getDistanceBetween } from "../utils";
import EventItem from "./event-item";
import Line from "./line";
import TimelineDate from "./timeline-date";

const TimelineBodyWrapper = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

interface Props {
  timeMode: string;
  size: number;
  eventsExpanding: EventsExpanding;
  dates: Array<string>;
  data: Data;
  onMainItemPress?: OnItemPress;
  onSubItemPress?: OnItemPress;
  showSubItemsOnMainItemPress: boolean;
  updateTimeModeByDateTap: () => void;
  updateEventsExpanding: (isExpanded: boolean, index: number) => void;
  updateSize: (size: number) => void;
  scrollPosition: number;
  updateScrollPosition: (scrollPosition: number) => void;
  datesStyles?: Styles;
  datesFormat?: DatesFormat;
  dateLinesStyles?: DateLinesStyles;
  modesToDayContainerSize: ModesToDayContainerSize;
  gapBetweenEvents: number;
  setEventsPosition: (eventsPositions: EventsPosition) => void;
  setScrollRef: (ref: ScrollRef, isX?: boolean) => void;
  horizontal?: boolean;
}

const TimelineBody: React.FC<Props> = ({
  timeMode,
  size,
  eventsExpanding,
  dates,
  data,
  onMainItemPress,
  onSubItemPress,
  showSubItemsOnMainItemPress,
  updateTimeModeByDateTap,
  updateEventsExpanding,
  updateSize,
  scrollPosition,
  updateScrollPosition,
  datesStyles,
  datesFormat,
  dateLinesStyles,
  modesToDayContainerSize,
  gapBetweenEvents,
  setEventsPosition,
  setScrollRef,
  horizontal,
}) => {
  const renderDates = (): React.ReactNode =>
    dates.map(date => (
      <TimelineDate
        key={date}
        date={date}
        timeMode={timeMode}
        datesFormat={datesFormat}
        datesStyles={datesStyles}
        modesToDayContainerSize={modesToDayContainerSize}
        horizontal={horizontal}
      />
    ));

  const renderLines = (): React.ReactNode =>
    dates.map(date => (
      <Line
        key={date}
        date={date}
        timeMode={timeMode}
        dateLinesStyles={dateLinesStyles}
        modesToDayContainerSize={modesToDayContainerSize}
        horizontal={horizontal}
      />
    ));

  const renderItems = (): React.ReactNode => {
    const firstIntervalDate = dates[0];
    const eventsExpandingKeys = Object.keys(eventsExpanding);
    const eventsPosition: EventsPosition = {};
    const mappedData = data.map(({ props, subItems }, index) => {
      const firstPosition = eventsExpandingKeys.reduce((acc, key) => {
        if (+key < index && eventsExpanding[+key]) {
          acc += pathOr(0, [+key, "subItems", "length"], data) * gapBetweenEvents;
        }
        return acc;
      }, gapBetweenEvents * (index + 1));
      const secondPosition = getDistanceBetween(
        firstIntervalDate,
        props.startDate,
        modesToDayContainerSize[timeMode],
        true,
      );
      eventsPosition[props.id] = {
        left: horizontal ? secondPosition : firstPosition,
        top: horizontal ? firstPosition : secondPosition,
      };

      return (
        <EventItem
          key={props.id}
          props={props}
          subItems={subItems}
          onMainItemPress={onMainItemPress}
          onSubItemPress={onSubItemPress}
          showSubItemsOnMainItemPress={showSubItemsOnMainItemPress}
          timeMode={timeMode}
          firstIntervalDate={firstIntervalDate}
          position={firstPosition}
          index={index}
          eventsExpanding={eventsExpanding}
          updateEventsExpanding={updateEventsExpanding}
          scrollPosition={scrollPosition}
          modesToDayContainerSize={modesToDayContainerSize}
          gapBetweenEvents={gapBetweenEvents}
          horizontal={horizontal}
        />
      );
    });

    const openedSubItemsCount = eventsExpandingKeys.reduce((acc, key) => {
      if (eventsExpanding[+key]) {
        acc += pathOr(0, [+key, "subItems", "length"], data);
      }
      return acc;
    }, 0);

    const totalSize =
      openedSubItemsCount * gapBetweenEvents + data.length * gapBetweenEvents + gapBetweenEvents;

    if (totalSize > size) {
      updateSize(totalSize);
    }
    setEventsPosition(eventsPosition);
    return mappedData;
  };

  const onScroll = (e: React.SyntheticEvent): void => {
    const updatedScrollPosition = pathOr(
      0,
      ["nativeEvent", "contentOffset", horizontal ? "x" : "y"],
      e,
    );
    if (updatedScrollPosition !== scrollPosition) {
      updateScrollPosition(updatedScrollPosition);
    }
  };

  if (horizontal) {
    return (
      <ScrollView
        horizontal
        style={{ marginVertical: 10, height: size }}
        onScroll={onScroll}
        ref={ref => setScrollRef(ref, true)}
      >
        <TimelineBodyWrapper style={{ flexDirection: "column" }}>
          <TouchableOpacity
            onPress={updateTimeModeByDateTap}
            activeOpacity={1}
            style={{ flexDirection: "row" }}
          >
            {renderDates()}
          </TouchableOpacity>
          <ScrollView ref={setScrollRef}>
            <View style={{ height: size, flexDirection: "row" }}>
              {renderLines()}
              {renderItems()}
            </View>
          </ScrollView>
        </TimelineBodyWrapper>
      </ScrollView>
    );
  }
  return (
    <ScrollView style={{ marginVertical: 10 }} onScroll={onScroll} ref={setScrollRef}>
      <TimelineBodyWrapper>
        <TouchableOpacity onPress={updateTimeModeByDateTap} activeOpacity={1}>
          {renderDates()}
        </TouchableOpacity>
        <ScrollView horizontal ref={ref => setScrollRef(ref, true)}>
          <View style={{ flex: 1, width: size }}>
            {renderLines()}
            {renderItems()}
          </View>
        </ScrollView>
      </TimelineBodyWrapper>
    </ScrollView>
  );
};

export default TimelineBody;
