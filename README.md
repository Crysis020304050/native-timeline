# Api

## Props

- **data**: [Data](#data)

 Specify an array of event items and optional it's sub items

- **period**: [Period](#period)
 
 Specify time period to be rendered

- **horizontal**?: boolean
 
 Specify timeline position(default is vertical)
 
 - **showSubItemsOnMainItemPress**?: boolean (true by default)
 
 Specify if sub events will be shown when user press main event item
 
 - **useTapOnDatesToChangeTimeMode**?: boolean (true by default)
 
 Specify if time mode will be changed when user press dates container
 
 - **defaultTimeMode**?: string (default is "Days")
 
 Timeline has 3 time modes("Months", "Weeks", "Days"), you can chose one by default
 
 Use **TIME_MODES** constant for this
 ```typescript
import { TIME_MODES } from "native-timeline";

defaultTimeMode={TIME_MODES.W}
``` 

 - **onMainItemPress**?: [OnItemPress](#onitempress)

 Specify function that will be called when user press main event item, event [ID](#id) will be passed to this function

 - **onSubItemPress**?: [OnItemPress](#onitempress)

 Specify function that will be called when user press sub event item, event [ID](#id) will be passed to this function
 
 - **useStickyItemsText**?: boolean (true by default)
 
 Specify if event text will be moved inside event to be visible when user scroll timeline
 
 - **datesStyles**?: [Styles](#styles)
 
 Specify styles provided to timeline dates
 
 - **datesFormat**?: [DatesFormat](#datesformat)
 
 Specify timeline dates format for every time mode(default is "MMM" for "Months" time mode, "MM-DD" for "Weeks" time mode and "DD ddd" for "Days" time mode)

 Use **TIME_MODES** constant for this
  ```typescript
 import { TIME_MODES } from "native-timeline";
 
 datesFormat={{ [TIME_MODES.M]: "YYYY MMM" }, { [TIME_MODES.D]: "DD MMM" }}
 ``` 

 In this example dates format for "Weeks" time mode will be default

 - **dateLinesStyles**?: [DateLinesStyles](#datelinesstyles)
 
 Specify styles for regular day, weekend or today on timeline

 For example, you can color all weekends with red(default this color is #FFFFFF for regular day, #DEDEDE for weekend and #BBD0DE for today)
 
 - **modesToDayContainerSize**?: [ModesToDayContainerSize](#modestodaycontainersize)
 
 Specify day unit size for every time mode
 
 You can control timeline scale in every time mode(default is 10px for "Months" time mode, 20px for "Weeks" time mode and 50px for "Days" time mode) 
 
 Use **TIME_MODES** constant for this
   ```typescript
  import { TIME_MODES } from "native-timeline";
  
  modesToDayContainerSize={{ [TIME_MODES.W]: 30 }, { [TIME_MODES.D]: 80 }}
  ``` 

 In this example day unit size for "Months" time mode will be default
 
 - **gapBetweenEvents**?: number(50 by default)
 
 Specify left or top distance(depending on timeline position) between events
 
 If event item width or height(depending on timeline position) will be increased you will most likely need to increase this distance
 
 - **useSelectForScrollingToItems**?: boolean(true by default)
 
 Specify if main event items will be shown in modal selector, also add possibility to scroll to chosen event by picking it in the selector
 
 - **selectProps**?: [SelectProps](#selectprops)
 
 If you use modal selector you can specify it's styles or some settings 

## Types and interfaces

- ##### DateArgs
``` typescript
type DateArgs = Date | moment.Moment | string | number;
```

- ##### ID
``` typescript
type type ID = string | number;
```

- ##### Styles
``` typescript
type Styles = { container?: ViewStyle; text?: TextStyle };
```

- ##### ItemProps
``` typescript
interface ItemProps {
  startDate: DateArgs;
  endDate: DateArgs;
  title: string;
  styles: Styles;
  id: ID;
}
```

- ##### Data
``` typescript
type Data = Array<{ props: ItemProps; subItems?: Array<ItemProps> }>;
```

- ##### Period
``` typescript
type Period = { startDate: DateArgs; endDate: DateArgs };
```

- ##### OnItemPress
``` typescript
type OnItemPress = (id: ID) => void;
```

- ##### DatesFormat
``` typescript
type DatesFormat = Record<string, string>;
```

- ##### DateLinesStyles
``` typescript
type DateLinesStyles = { day?: ViewStyle; weekend?: ViewStyle; today?: ViewStyle };
```

- ##### ModesToDayContainerSize
``` typescript
type ModesToDayContainerSize = Record<string, number>;
```

- ##### SelectProps
``` typescript
type SelectProps = { [key: string]: any };
```

react-native-modal-selector module is used in this module, so you can find SelectProps [here](https://www.npmjs.com/package/react-native-modal-selector#api)

Your can pass any props except **data** and **onChange**