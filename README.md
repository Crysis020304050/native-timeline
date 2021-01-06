<br/>
<p align="center">
  <a href="https://github.com/Crysis020304050/native-timeline">
    <img src="https://i.ibb.co/rZV590V/logo.png" alt="Logo" width="100" height="65">
  </a>
  <h1 align="center">native-timeline</h1>
</p>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li>
      <a href="#api">Api</a>
      <ul>
        <li><a href="#props">Props</a></li>
        <li><a href="#types-and-interfaces">Types and interfaces</a></li>
      </ul>
    </li>
  </ol>
</details>

## About The Project

 [React Native](https://reactnative.dev/) timeline component, based on [typescript](https://www.typescriptlang.org/). It helps to manage your events in different time modes("Months", "Weeks", "Days"). It can be well customized to suit your needs using props. Read the documentation below.
 
## Installation

```bash
# using yarn
yarn add native-timeline

# using npm
npm install native-timeline
```
 
## Usage

At the very minimum:

```typescript jsx
import React from "react";
import Timeline from "native-timeline";

// ... some component and it's logic

const data = [
  {
    props: {
      id: 1,
      startDate: "2020-12-10",
      endDate: "2020-12-18",
      title: "Test1",
    },
    subItems: [
      {
        id: 2,
        startDate: "2020-12-10",
        endDate: "2020-12-14",
        title: "SubTest1",
      },
      {
        id: 3,
        startDate: "2020-12-15",
        endDate: "2020-12-18",
        title: "SubTest2",
      },
    ],
  },
  {
    props: {
      id: 4,
      startDate: "2020-12-19",
      endDate: "2020-12-25",
      title: "Test2",
    },
  },
];

const period = { startDate: "2020-12-01", endDate: "2020-12-31" };

return <Timeline data={data} period={period} />
```

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
 
## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Danyil Zatserkovnyi - crysiswarhead020304050@gmail.com

Project Link: [https://github.com/Crysis020304050/native-timeline](https://github.com/Crysis020304050/native-timeline)
 
## Api

### Props

- **data**: [Data](#data)

 Specify an array of event items and optional it's sub items

- **period**: [Period](#period)
 
 Specify time period to be rendered

- **horizontal**?: boolean
 
 Specify timeline position(default is vertical)
 
 **Vertical:** 
 
 ![Vertical](https://i.ibb.co/fXB594s/vertical.png)
 
 **Horizontal:**
 
 ![Horizontal](https://i.ibb.co/XxrBKnH/horizontal.png)
 
 - **showSubItemsOnMainItemPress**?: boolean (true by default)
 
 Specify if sub events will be shown when user press main event item
 
 ![Sub events opening](https://i.ibb.co/QNRgShd/sub-items.gif)
 
 - **useTapOnDatesToChangeTimeMode**?: boolean (true by default)
 
 Specify if time mode will be changed when user press dates container
 
 ![Tap on dates](https://i.ibb.co/4s3jmf1/tap-on-dates.gif)
 
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
 
 ![Sticky text](https://i.ibb.co/w4QkpgW/sticky.gif)
 
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
 
 **Default months format:**
 
 ![Default months format](https://i.ibb.co/86JTHnR/dates-format-1.png)
 
 **Custom months format:**
  
 ![Custom months format](https://i.ibb.co/9ZvKNMt/dates-format-2.png)

 - **dateLinesStyles**?: [DateLinesStyles](#datelinesstyles)
 
 Specify styles for regular day, weekend or today on timeline

 For example, you can color all weekends with red(default this color is #FFFFFF for regular day, #DEDEDE for weekend and #BBD0DE for today)
 
 **Default today color:**
  
 ![Default today color](https://i.ibb.co/YdrH6Xg/lines-color-1.png)
  
 **Custom today color:**
   
 ![Custom today color](https://i.ibb.co/x7F4KLJ/lines-color-2.png)
 
 - **modesToDayContainerSize**?: [ModesToDayContainerSize](#modestodaycontainersize)
 
 Specify day unit size for every time mode
 
 You can control timeline scale in every time mode(default is 10px for "Months" time mode, 20px for "Weeks" time mode and 50px for "Days" time mode) 
 
 Use **TIME_MODES** constant for this
   ```typescript
  import { TIME_MODES } from "native-timeline";
  
  modesToDayContainerSize={{ [TIME_MODES.W]: 30 }, { [TIME_MODES.D]: 80 }}
  ``` 

 In this example day unit size for "Months" time mode will be default
 
 **Default day unit size:**
   
 ![Default day unit size](https://i.ibb.co/BwdQ6fj/days-size-1.png)
   
 **Custom day unit size:**

 ![Custom day unit size](https://i.ibb.co/vDd3Hmw/days-size-2.png)
 
 - **gapBetweenEvents**?: number(50 by default)
 
 Specify left or top distance(depending on timeline position) between events
 
 If event item width or height(depending on timeline position) will be increased you will most likely need to increase this distance
 
 **Default gap:**
    
 ![Default gap](https://i.ibb.co/hBjFX7f/gap-1.png)
    
 **Custom gap:**
 
 ![Custom gap](https://i.ibb.co/rkpxS95/gap-2.png)
 
 - **useSelectForScrollingToItems**?: boolean(true by default)
 
 Specify if main event items will be shown in modal selector, also add possibility to scroll to chosen event by picking it in the selector
 
 ![Select scroller](https://i.ibb.co/HYRzSJ9/select.gif)
 
 - **selectProps**?: [SelectProps](#selectprops)
 
 If you use modal selector you can specify it's styles or some settings 

### Types and interfaces

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
  styles?: Styles;
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

**react-native-modal-selector** module is used in this project, so you can find SelectProps [here](https://www.npmjs.com/package/react-native-modal-selector#api)

Your can pass any props except **data** and **onChange**