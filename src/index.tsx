import styled from "@emotion/native";
import debounce from "lodash.debounce";
import React, { Component } from "react";
import { Dimensions, ScrollView, TextStyle, ViewStyle } from "react-native";
import { TIME_MODES, TIME_MODES_TO_TIME_UNITS } from "./constants";
import EventSelect from "./event-select";
import TimelineBody from "./timeline-body";
import { DateArgs, enumerateDatesBetweenDates } from "./utils";

export type Data = Array<{ props: ItemProps; subItems?: Array<ItemProps> }>;

export type Styles = { container?: ViewStyle; text?: TextStyle };

export type DatesFormat = Record<string, string>;

export type DateLinesStyles = { day?: ViewStyle; weekend?: ViewStyle; today?: ViewStyle };

export type ID = string | number;

export type EventsExpanding = Record<number, boolean>;

export type ModesToDayContainerSize = Record<string, number>;

export type EventsPosition = Record<ID, { top: number; left: number }>;

export type ScrollRef = null | ScrollView;

export type SelectProps = { [key: string]: any };

export type OnItemPress = (id: ID) => void;

export type Period = { startDate: DateArgs; endDate: DateArgs };

export { TIME_MODES };

const MODES_TO_DAY_CONTAINER_SIZE: ModesToDayContainerSize = {
  [TIME_MODES.M]: 10,
  [TIME_MODES.W]: 20,
  [TIME_MODES.D]: 50,
};

const GAP_BETWEEN_EVENTS = 50;

export interface ItemProps {
  startDate: DateArgs;
  endDate: DateArgs;
  title: string;
  styles?: Styles;
  id: ID;
}

interface Props {
  defaultTimeMode?: string;
  onMainItemPress?: OnItemPress;
  onSubItemPress?: OnItemPress;
  data: Data;
  showSubItemsOnMainItemPress?: boolean;
  period: Period;
  useSelectForScrollingToItems?: boolean;
  selectProps?: SelectProps;
  useTapOnDatesToChangeTimeMode?: boolean;
  useStickyItemsText?: boolean;
  datesStyles?: Styles;
  datesFormat?: DatesFormat;
  dateLinesStyles?: DateLinesStyles;
  modesToDayContainerSize?: ModesToDayContainerSize;
  gapBetweenEvents?: number;
  horizontal?: boolean;
}

interface State {
  timeMode: string;
  size: number;
  eventsExpanding: EventsExpanding;
  scrollPosition: number;
}

const TimelineContainer = styled.View`
  display: flex;
  flex: 1;
  padding: 5px;
`;

class Timeline extends Component<Props, State> {
  state = {
    timeMode: this.props.defaultTimeMode || TIME_MODES.D,
    size: Dimensions.get("window")[this.props.horizontal ? "height" : "width"],
    eventsExpanding: {},
    scrollPosition: 0,
  };

  eventsPositions: EventsPosition = {};

  scrollYRef: ScrollRef = null;
  scrollXRef: ScrollRef = null;

  updateScrollPosition = (scrollPosition: number): void => {
    const { useStickyItemsText = true } = this.props;
    if (useStickyItemsText) {
      this.setState({ scrollPosition });
    }
  };

  debouncedScrollPositionUpdater = debounce(this.updateScrollPosition, 100);

  setTimeMode = (timeMode: string): void => this.setState({ timeMode });

  updateEventsExpanding = (isExpanded: boolean, index: number): void => {
    this.setState({ eventsExpanding: { ...this.state.eventsExpanding, [index]: isExpanded } });
  };

  updateSize = (size: number): void => this.setState({ size });

  updateTimeModeByDateTap = (): void => {
    const { useTapOnDatesToChangeTimeMode = true } = this.props;
    if (useTapOnDatesToChangeTimeMode) {
      const { timeMode } = this.state;
      let updatedTimeMode;
      switch (timeMode) {
        case TIME_MODES.M: {
          updatedTimeMode = TIME_MODES.W;
          break;
        }
        case TIME_MODES.W: {
          updatedTimeMode = TIME_MODES.D;
          break;
        }
        case TIME_MODES.D: {
          updatedTimeMode = TIME_MODES.M;
          break;
        }
      }
      if (updatedTimeMode) {
        this.setTimeMode(updatedTimeMode);
      }
    }
  };

  setEventsPosition = (eventsPositions: EventsPosition): void => {
    this.eventsPositions = eventsPositions;
  };

  setScrollRef = (ref: ScrollRef, isX?: boolean): void => {
    if (isX) {
      this.scrollXRef = ref;
    } else {
      this.scrollYRef = ref;
    }
  };

  onSelect = (id: ID): void => {
    if (this.scrollXRef && this.scrollYRef) {
      const { left, top } = this.eventsPositions[id];
      const { gapBetweenEvents = GAP_BETWEEN_EVENTS, horizontal } = this.props;
      this.debouncedScrollPositionUpdater.cancel();
      this.updateScrollPosition(horizontal ? left : top);
      this.scrollYRef.scrollResponderScrollTo({
        y: top - (horizontal ? gapBetweenEvents : 0),
        animated: true,
      });
      this.scrollXRef.scrollResponderScrollTo({
        x: left - (horizontal ? 0 : gapBetweenEvents),
        animated: true,
      });
    }
  };

  render() {
    const {
      onMainItemPress,
      onSubItemPress,
      data,
      showSubItemsOnMainItemPress = true,
      period,
      useSelectForScrollingToItems = true,
      datesFormat,
      datesStyles,
      dateLinesStyles,
      modesToDayContainerSize = {},
      gapBetweenEvents = GAP_BETWEEN_EVENTS,
      selectProps = {},
      horizontal,
    } = this.props;
    const { timeMode, size, eventsExpanding, scrollPosition } = this.state;
    const dates = enumerateDatesBetweenDates(
      period.startDate,
      period.endDate,
      TIME_MODES_TO_TIME_UNITS[timeMode],
    );
    return (
      <TimelineContainer>
        {useSelectForScrollingToItems && (
          <EventSelect
            items={data.map(({ props }) => ({ key: props.id, label: props.title }))}
            onChange={this.onSelect}
            {...selectProps}
          />
        )}
        <TimelineBody
          timeMode={timeMode}
          size={size}
          eventsExpanding={eventsExpanding}
          dates={dates}
          data={data}
          onMainItemPress={onMainItemPress}
          onSubItemPress={onSubItemPress}
          showSubItemsOnMainItemPress={showSubItemsOnMainItemPress}
          updateTimeModeByDateTap={this.updateTimeModeByDateTap}
          updateEventsExpanding={this.updateEventsExpanding}
          updateSize={this.updateSize}
          scrollPosition={scrollPosition}
          updateScrollPosition={this.debouncedScrollPositionUpdater}
          datesFormat={datesFormat}
          datesStyles={datesStyles}
          dateLinesStyles={dateLinesStyles}
          modesToDayContainerSize={{ ...MODES_TO_DAY_CONTAINER_SIZE, ...modesToDayContainerSize }}
          gapBetweenEvents={gapBetweenEvents}
          setEventsPosition={this.setEventsPosition}
          setScrollRef={this.setScrollRef}
          horizontal={horizontal}
        />
      </TimelineContainer>
    );
  }
}

export default Timeline;
